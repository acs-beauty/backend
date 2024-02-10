const ApiError = require('./ApiError')

const asyncErrorHandler = func => {
  return (req, res, next) => {
    func(req, res, next).catch(err => {
      if (err instanceof Error) {
        next(ApiError.badRequest(err.errors))
      } else {
        next(ApiError.internalServerError(err.errors))
      }
    })
  }
}

module.exports = asyncErrorHandler
