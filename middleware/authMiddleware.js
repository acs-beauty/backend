const jwt = require('jsonwebtoken')
const ApiError = require('../errors/ApiError')
const { User } = require('../models')

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
    //   console.log('11111111111111')
      return next(ApiError.notAuthorized('Пользователь не авторизован'))
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    // const { email } = req.body
    // console.log('222222')
    // const user = await User.findOne({ where: { email } })
    // console.log('3333333333333333')
    // if (!(decoded.id === user?.id || decoded.isAdmin)) {
    //   return next(ApiError.forbidden('У вас недостаточно прав или вы пытаетесь получить защищённую информацию'))
    // }
    //   console.log('44444444444444')
    //   console.log('decoded.id = ', decoded.id)
    //   console.log('user.id = ', user.id)
    req.id = decoded.id
    next()
  } catch (e) {
    return next(ApiError.notAuthorized('Пользователь не авторизован'))
  }
}
