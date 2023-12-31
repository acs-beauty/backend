const jwt = require('jsonwebtoken')
const ApiError = require('../errors/ApiError')
const { User } = require('../models')

module.exports = async (req, res, next) => {
  // console.log("req.body.isAdmin = ", req.body.isAdmin)
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return next(ApiError.notAuthorized('Пользователь не авторизован'))
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    // console.log('2222222222')

    // const { email } = req.body
    // console.log('222222')
    // const user = await User.findOne({ where: { email } })
    // console.log('3333333333333333')
    // if (!(decoded.id === user?.id || decoded.isAdmin)) {
    //   return next(ApiError.forbidden('У вас недостаточно прав или вы пытаетесь получить защищённую информацию'))
    // }
    if (!decoded.isAdmin || (req.body.isAdmin && !decoded.isAdmin)) {
      return next(ApiError.forbidden('У вас недостаточно прав или вы пытаетесь получить защищённую информацию'))
    }

    // console.log('decoded.isAdmin = ', decoded.isAdmin)
    req.id = decoded.id
    next()
  } catch (e) {
    return next(ApiError.notAuthorized('Пользователь не авторизован'))
  }
}
