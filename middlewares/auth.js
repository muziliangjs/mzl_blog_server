const jwt = require('jsonwebtoken');
const config = require('../config/config')
class Auth {
  constructor() {

  }

  // 不是一个方法 get 一个属性
  get verify() {
    return async (ctx, next) => {
      let userToken
      try {
        userToken = ctx.request.header.authorization.split(' ')[1]
      } catch (err) {
        throw new global.errs.ParamsError({
          code: 403,
          msg: 'token不合法',
        })
      }
      if (!userToken) {
        throw new global.errs.ParamsError({
          code: 403,
          msg: 'token不存在',
        })
      }
      let decode;
      try {
        const secretKey = config.security.secretKey
        decode = jwt.verify(userToken, secretKey)
      } catch (err) {
        if (err.name == 'TokenExpiredError') {
          throw new global.errs.ParamsError({
            code: 402,
            msg: 'token过期',
          })
        }
        throw new global.errs.ParamsError({
          code: 403,
          msg: 'token不合法'
        })
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope,
      }
      await next()
    }
  }
}

module.exports = {
  Auth
}