const Router = require('koa-router') 
const router = new Router({
  prefix: '/v1/article'
})
const {
  Article
} = require('../../models/articleModel.js')

router.get('/', (ctx) => { 
  ctx.body = {
    code: 200
  }
})

module.exports = router;