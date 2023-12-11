class Errors extends Error {
  constructor(status, message) {
    super()
    this.status = status
    this.message = message
  }

  static badRequest(message) {
    return new Errors(400, message)
  }
  static internalServerError(message) {
    return new Errors(500, message)
  }
  static notFound(message) {
    return new Errors(404, message)
  }
  static forbidden(message) {
    return new Errors(403, message)
  }
  static notAuthorized(message) {
    return new Errors(401, message)
  }
}

module.exports = Errors
