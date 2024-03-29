const Errors = require('../errors/ApiError')

module.exports = (err, req, res, next) => {
  if (err instanceof Errors) {
    return res.status(err.status).json({ message: err.message })
  }
  return res.status(500).json({ message: err.message })
}
