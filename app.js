const Koa = require('koa2')
// const bodyParser = require('koa-bodyparser')
const path = require('path');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const InitManager = require('./core/init.js')
const catchError = require('./middlewares/exception')
const cors = require('koa2-cors');

const app = new Koa()

// app.use(cors())
app.use(catchError)
// app.use(bodyParser())
app.use(koaStatic(path.join(__dirname,'public'))); //这个public以下的路径就是生成的url。
app.use(koaBody({
  multipart: true, //设置true表示支持文件
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'), //设置图片上传的目录
    keepExtensions: true //图片上传后不改变扩展名
  }
}))
InitManager.initCore(app)

app.listen(8888, () => {
  console.log(`blog server start success post 8888`)
})