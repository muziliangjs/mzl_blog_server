const Router = require('koa-router')
const path = require('path');
const router = new Router({
  prefix: '/v1/upLoad'
})
const {
  success,
  error
} = require('../../lib/lelper')
const {
  Auth
} = require('../../../middlewares/auth')

// 列表
router.post('/', new Auth().verify, async (ctx) => {
  const file = ctx.request.files.file;
  const basename = path.basename(file.path); //获取图片名称（basename） 
  //ctx.origin是域名
  success({
    data: {
      url: `${ctx.origin}/uploads/${basename}`
    }
  })
})

module.exports = router;