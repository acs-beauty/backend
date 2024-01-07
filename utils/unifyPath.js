const crypto = require('crypto')

const unifyPath = req => {
  let path = req.files[0].originalname
  path = path.slice(0, -4) + crypto.randomBytes(2).toString('hex') + path.slice(-4)
  return path
}

module.exports = unifyPath
