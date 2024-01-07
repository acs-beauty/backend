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

const generateJWT = (id, email) => jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: '30d' })

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
    const token = generateJWT(user.id, email)

    return res.status(201).json({ token })
  })

  login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return next(ApiError.badRequest('Неверный email'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.badRequest('Указан неверный пароль'))
    }
    // const token = generateJWT(user.id, user.email, user.isAdmin)
    const token = generateJWT(user.id, user.email)
    return res.json({ token })
  })

  me = asyncErrorHandler(async (req, res, next) => {
    const id = req.id
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password', 'isAdmin', 'note', 'createdAt'] },
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
    const avatar = decodeURI(user.dataValues.avatar)

    if (avatar) {
      const params = {
        Bucket: 'acs-beauty-bucket',
        Key: avatar.slice(avatar.lastIndexOf('/') + 1),
      }
      s3.deleteObject(params, (err, data) => {})
    }

    const params = {
      Body: req.files[0].buffer,
      Bucket: 'acs-beauty-bucket',
      Key: unifyPath(req),
    }
    s3.upload(params, async (err, data) => {
      const [count, [user]] = await User.update(
        { ...req.body, avatar: decodeURI(data.Location) },
        {
          where: {
            id,
          },
          raw: true,
          // attributes: { exclude: ['password', 'isAdmin'] },
          returning: true,
        }
      )

      if (!count) {
        return next(ApiError.badRequest('Неверный запрос'))
      }
      const { isAdmin, password, note, createdAt, ...rest } = user
      return res.json(rest)
    })
  })

  delete = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const count = await User.destroy({ where: { id } })
    if (!count) {
      return next(ApiError.notFound(`пользователь с id ${id} не найден`))
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
            [Op.like]: `%${lookup}%`,
          },
        },
        {
          lastName: {
            [Op.like]: `%${lookup}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${lookup}%`,
          },
        },
        {
          id: /^\d+$/.test(lookup)
            ? {
                [Op.eq]: lookup,
              }
            : { [Op.lt]: 0 },
        },
        {
          phone: {
            [Op.like]: `%${lookup}%`,
          },
        },
      ]
    }

    // if (typeof lookup === 'number') {
    //   where = { ...where, [Op.or]: [...where[Op.or], { id: { [Op.eq]: lookup } }] }
    // }

    let users = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password', 'isAdmin', 'avatar'] },
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
