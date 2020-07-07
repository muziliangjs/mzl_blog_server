class HttpException extends Error {
  constructor(msg = '服务器异常', code = 500, data = '') {
    super()
    this.data = data
    this.code = code
    this.msg = msg
  }
}

// 请求成功
class Success extends HttpException {
  constructor({msg = 'ok', data = ''}){
    super()
    this.code = 200
    this.msg = msg
    this.data = data
  }
}

// 参数错误
class ParamsError extends HttpException {
  constructor({msg = '参数错误', data = '', code = 500}){
    super()
    this.code = code
    this.msg = msg
    this.data = data
  }
}



module.exports = {
  HttpException,
  Success,
  ParamsError
}