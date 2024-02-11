const jwt = require('jsonwebtoken')
const ApiError = require('../errors/ApiError')
const { User } = require('../models')

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const accessToken = req.headers.authorization.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.notAuthorized('Пользователь не авторизован'))
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET)

    if (!decoded.isAdmin) {
      return next(ApiError.forbidden('У вас недостаточно прав'))
    }

    req.id = decoded.id
    next()
  } catch (e) {
    return next(ApiError.notAuthorized('Пользователь не авторизован'))
  }
}
