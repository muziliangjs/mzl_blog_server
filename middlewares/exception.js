const {
  HttpException
} = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof HttpException) {
      ctx.body = {
        msg: err.msg,
        code: err.code,
        data: err.data
        // request: `${ctx.method} ${ctx.path}`
      }
      // ctx.status = err.code
    } else {
      ctx.body = {
        msg: err || '服务器错误',
        code: 500,
        request: `${ctx.method} ${ctx.path}`
      }
      // ctx.status = 500
    } 
  }
}

module.exports = catchError