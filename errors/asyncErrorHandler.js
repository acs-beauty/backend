const ApiError = require('./ApiError')

const asyncErrorHandler = func => {
  return (req, res, next) => {
    func(req, res, next).catch(err => {
      console.log(err)
      next(ApiError.badRequest(err.errors))
    })
  }
}

module.exports = asyncErrorHandler
