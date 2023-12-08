const ApiError = require('../errors/ApiError')
const { User } = require('../models')
const findUser = require('../queries/findUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJWT = (id, email, isAdmin) => jwt.sign({ id, email, isAdmin }, process.env.SECRET_KEY, { expiresIn: '24h' })

class SubcategoryController {
  async post(req, res, next) {
    const { email, password, isAdmin } = req.body
    if (!email) {
      return next(ApiError.badRequest('Не передан email'))
    }
    if (!password) {
      return next(ApiError.badRequest('Не передан пароль'))
    }
    console.log('email = ', email)

    // await User.sync()
    let user = await User.findOne({ where: { email } })
    // let users = await User.findAll()
    // console.log('user = ', user)
    if (user) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }
    const hashedPassword = await bcrypt.hash(password, 5)
    user = await User.create({ email, password: hashedPassword, isAdmin })
    const token = generateJWT(user.id, email, isAdmin)

    return res.json({ token })
  }

  async login(req, res, next) {
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
  }

  async me(req, res, next) {
    const id = req.id
    const user = await User.findOne({ where: { id } })
    const { password, ...info } = user.toJSON()
    // console.log("user = ", user.toJSON())
    return res.json(info)
    // try {
    //   const user = await findUser({ id: req.tokenData.id })

    //   const userData = {
    //     id: user.id,
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email,
    //     phone: user.phone,
    //     roles: user.roles.map(({ role }) => role),
    //   }

    //   res.status(200).send(userData)
    // } catch (err) {
    //   next(err)
    // }
  }

  // async get(req, res, next) {
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

  async post(req, res) {}
  async patch(req, res) {}
}

module.exports = new SubcategoryController()

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
