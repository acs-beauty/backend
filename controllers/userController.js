const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { User } = require('../models')
const findUser = require('../queries/findUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
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
      return next(ApiError.notFound('Пользователь с таким email не найден'))
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
    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password', 'isAdmin'] } })
    // const { password, isAdmin, ...info } = user.toJSON()
    // console.log("user = ", user.toJSON())
    return res.json(user)
  })
}

module.exports = new UserController()

// module.exports.getProfile = async (req, res, next) => {
//   try {
//     const user = await findUser({ id: req.tokenData.id })

//     const userData = {
//       id: user.id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       phone: user.phone,
//       roles: user.roles.map(({ role }) => role),
//     }

//     res.status(200).send(userData)
//   } catch (err) {
//     next(err)
//   }
// }
