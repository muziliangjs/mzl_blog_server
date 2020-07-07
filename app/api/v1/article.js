const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/article'
})
const {
  Auth
} = require('../../../middlewares/auth')
const {
  Article
} = require('../../models/articleModel.js')

router.post('/', new Auth().verify, async (ctx) => {
  ctx.body = {
    uid: ctx.auth.uid
  }
})

module.exports = router;