const { PAGE_SIZE } = require('../constants')
const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { User } = require('../models')
const findUser = require('../queries/findUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const unifyPath = require('../utils/unifyPath')
const s3 = require('../utils/s3')
const sendActivationEmail = require('../utils/sendActivationEmail')
const setTokens = require('../utils/setTokens')

// const generateJWT = (id, email, expiresIn) => jwt.sign({ id, email }, process.env.ACCESS_SECRET, { expiresIn })

class UserController {
  registration = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body
    if (!email) {
      return next(ApiError.badRequest('Не передан email'))
    }
    if (!password) {
      return next(ApiError.badRequest('Не передан пароль'))
    }

    let user = await User.findOne({ where: { email } })
    if (user) {
      return next(ApiError.badRequest('Неверный email'))
    }
    const hashedPassword = await bcrypt.hash(password, 5)

    user = await User.create({ email, password: hashedPassword })
    const emailToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET, { expiresIn: '3d' })
    sendActivationEmail(email, `${process.env.API_URL}/api/user/activate/${emailToken}`)

    // return res.status(201).json({ token })
    return res.status(201).json()
  })

  login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return next(ApiError.badRequest('Неверный email'))
    }

    if (!user.activated) {
      return next(ApiError.badRequest('Пользователь не активирован'))
    }

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.badRequest('Указан неверный пароль'))
    }

    setTokens(res, user.id)

    return res.status(200).json()
  })

  activate = asyncErrorHandler(async (req, res, next) => {
    const { token } = req.params

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
    const user = await User.findByPk(decoded.id)
    if (!user) {
      return next(ApiError.badRequest('Некорректная ссылка активации'))
    }
    user.activated = true
    await user.save()
    return res.redirect(process.env.CLIENT_URL)
  })

  logout = asyncErrorHandler(async (req, res, next) => {
    res.clearCookie('accessToken')
    // res.clearCookie('refreshToken')

    return res.status(200).json()
  })

  refresh = asyncErrorHandler(async (req, res, next) => {
    const { refreshToken } = req.cookies

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    const user = await User.findByPk(decoded.id)
    if (!user) {
      return next(ApiError.notAuthorized('Пользователь не авторизован'))
    }

    setTokens(res, user.id)

    return res.status(200).json()
  })

  me = asyncErrorHandler(async (req, res, next) => {
    const id = req.id
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password', 'isAdmin', 'note', 'createdAt', 'activated'] },
    })
    return res.json(user)
  })

  patchMe = asyncErrorHandler(async (req, res, next) => {
    const id = req.id

    const { isAdmin, password } = req.body

    if (isAdmin || password) {
      return next(ApiError.badRequest('Неверный запрос'))
    }

    const user = await User.findByPk(id)
    if (!user) {
      return next(ApiError.badRequest('Неверный запрос'))
    }

    const [_, [user1]] = await User.update(req.body, {
      where: {
        id,
      },
      returning: true,
      // raw: true,
    })

    if (!req.files.length) {
      const { isAdmin, password, note, createdAt, ...rest } = user1.get({ plain: true })
      return res.json(rest)
    }

    const avatar = decodeURI(user.dataValues.avatar)

    if (avatar) {
      const params = {
        Bucket: 'acs-beauty-bucket',
        Key: `user/${avatar.slice(avatar.lastIndexOf('/') + 1)}`,
      }
      s3.deleteObject(params).promise()
    }

    const params = {
      Body: req.files[0].buffer,
      Bucket: 'acs-beauty-bucket',
      Key: `user/${unifyPath(req)}`,
    }
    const data = await s3.upload(params).promise()

    user1.avatar = decodeURI(data.Location)
    user1.save()

    const { isAdmin: userIsAdmin, password: userPassword, note, createdAt, ...rest } = user1.get({ plain: true })
    return res.json(rest)
  })

  delete = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const user = await User.findByPk(id)
    if (!user) {
      return next(ApiError.notFound(`Брэнд с id ${id} не найден`))
    }

    await user.destroy()
    let avatar = decodeURI(user.dataValues.avatar)
    if (avatar) {
      const params = {
        Bucket: 'acs-beauty-bucket',
        Key: `brand/${avatar.slice(avatar.lastIndexOf('/') + 1)}`,
      }
      s3.deleteObject(params).promise()
    }

    return res.status(204).json()
    // return res.json('Категория была успешно удалена')
  })

  patch = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    let { password, isAdmin, createdAt } = req.body

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    if (password || isAdmin || createdAt) {
      return next(ApiError.badRequest('Невозможно выполнить запрос'))
    }

    let [count, [user]] = await User.update(req.body, {
      // attributes: { include: ['id', 'name'] },
      where: {
        id,
      },
      raw: true,
      returning: true,
    })

    if (!count) {
      return next(ApiError.notFound(`Пользователь с id ${id} не найден`))
    }
    let { password: userPassword, isAdmin: userIsAdmin, ...rest } = user
    return res.json(rest)
  })

  getPaginated = asyncErrorHandler(async (req, res, next) => {
    const { pageSize, page, lookup } = req.query

    if (!page) {
      return next(ApiError.badRequest('Не передан номер страницы пагинации'))
    }

    let where = {}
    if (lookup) {
      where[Op.or] = [
        {
          firstName: {
            [Op.iLike]: `%${lookup}%`,
          },
        },
        {
          lastName: {
            [Op.iLike]: `%${lookup}%`,
          },
        },
        {
          email: {
            [Op.iLike]: `%${lookup}%`,
          },
        },
        // {
        //   id: /^\d+$/.test(lookup)
        //     ? {
        //         [Op.eq]: lookup,
        //       }
        //     : { [Op.lt]: 0 },
        // },
        {
          phone: {
            [Op.iLike]: `%${lookup}%`,
          },
        },
      ]
    }

    if (/^\d+$/.test(lookup)) {
      where = {
        [Op.or]: [
          ...where[Op.or],
          {
            id: { [Op.eq]: lookup },
          },
        ],
      }
    }

    // if (typeof lookup === 'number') {
    //   where = { ...where, [Op.or]: [...where[Op.or], { id: { [Op.eq]: lookup } }] }
    // }

    let users = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password', 'isAdmin', 'avatar', 'activated'] },
      limit: pageSize || PAGE_SIZE,
      offset: (page - 1) * (pageSize || PAGE_SIZE),
      raw: true,
      order: [['id', 'ASC']],
      // nest: true,
    })

    return res.json(users)
  })
}

module.exports = new UserController()
