const jwt = require('jsonwebtoken')

const setTokens = (res, id) => {
  const accessToken = jwt.sign({ id }, process.env.ACCESS_SECRET, { expiresIn: '15m' })
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET, { expiresIn: '60d' })

  res.cookie('accessToken', accessToken, { maxAge: 15 * 60 * 1000, httpOnly: true })
  res.cookie('refreshToken', refreshToken, { maxAge: 60 * 24 * 3600 * 1000, httpOnly: true })
}

module.exports = setTokens
