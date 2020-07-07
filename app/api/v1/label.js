const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/label'
})
const {
  success,
  error
} = require('../../lib/lelper')
const {
  Auth
} = require('../../../middlewares/auth')
const {
  Label
} = require('../../models/labelModel.js')

// 列表
router.post('/', new Auth().verify, async (ctx) => { 
  const list = await Label.getLabelList()
  success({
    data: list
  })
})

// 添加
router.post('/create', new Auth().verify, async (ctx) => { 
  const {
    label
  } = ctx.request.body;
  if (!label) {
    error({
      msg: 'label参数必填'
    })
  }
  const data = await Label.createLabel(label)
  success({
    data: data
  })
})

module.exports = router;