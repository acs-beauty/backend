const crypto = require('crypto')

const unifyPath = (req, i = 0) => {
  let path = req.files[i].originalname
  path = path.slice(0, -4) + crypto.randomBytes(2).toString('hex') + path.slice(-4)
  return path
}

module.exports = unifyPath
