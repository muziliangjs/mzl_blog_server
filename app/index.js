const Koa = require('koa2')
const routing = require('./routes');

const app = new Koa()

// 注册路由
routing(app)

app.listen(8888, () => {
  console.log(`blog server start success`)
})