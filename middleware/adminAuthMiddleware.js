const jwt = require('jsonwebtoken')
const ApiError = require('../errors/ApiError')
const { User } = require('../models')

module.exports = async (req, res, next) => {
  // console.log('req.body.isAdmin = ', req.body.isAdmin)
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return next(ApiError.notAuthorized('Пользователь не авторизован'))
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    if (req.body.isAdmin && !decoded.isAdmin) {
      return next(ApiError.forbidden('У вас недостаточно прав или вы пытаетесь получить защищённую информацию'))
    }

    // req.id = decoded.id
    next()
  } catch (e) {
    // console.log(e.message)
    return next(ApiError.notAuthorized('Пользователь не авторизован'))
  }
}
