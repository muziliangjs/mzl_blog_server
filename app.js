const Koa = require('koa2') 
const bodyParser = require('koa-bodyparser')
const InitManager = require('./core/init.js')
const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(catchError)
app.use(bodyParser())
InitManager.initCore(app)

app.listen(8888, () => {
  console.log(`blog server start success post 8888`)
})