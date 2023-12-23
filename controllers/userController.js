const ApiError = require('../errors/ApiError')
const { User } = require('../models')
const findUser = require('../queries/findUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJWT = (id, email, isAdmin) => jwt.sign({ id, email, isAdmin }, process.env.SECRET_KEY, { expiresIn: '24h' })

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, isAdmin } = req.body
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
      user = await User.create({ email, password: hashedPassword, isAdmin })
      const token = generateJWT(user.id, email, isAdmin)

      return res.json({ token })
    } catch (err) {
      return next(ApiError.badRequest(err.message))
    }
  }

  async login(req, res, next) {
    try {
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
    } catch (err) {
      return next(ApiError.badRequest(err.message))
    }
  }

  async me(req, res, next) {
    try {
      const id = req.id
      const user = await User.findOne({ where: { id } })
      const { password, isAdmin, ...info } = user.toJSON()
      // console.log("user = ", user.toJSON())
      return res.json(info)
    } catch (err) {
      return next(ApiError.badRequest(err.message))
    }
  }
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
