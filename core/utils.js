const jwt = require('jsonwebtoken');
const config = require('../config/config')

// 生成token
const generateToken = (uid, scope) => {
  const secretKey = config.security.secretKey
  const expiresIn = config.security.expiresIn
  const token = jwt.sign({
    uid,
    scope
  }, secretKey, {
    expiresIn
  })
  return `Bearer ${token}`
}

module.exports = {
  generateToken
}