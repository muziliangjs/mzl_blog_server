const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/user'
})
const {
  success,
  error
} = require('../../lib/lelper')
const {
  User
} = require('../../models/userModel.js')

// 注册用户
router.post('/register', async ctx => {
  const {
    password,
    username
  } = ctx.request.body;
  if (!username || !password) {
    error({
      msg: '账号密码不能为空'
    })
  }
  const user = await User.getUserByOpenid(username) 
  if (user) error({
    msg: '用户已存在'
  })
  const {
    dataValues
  } = await User.registerUser({
    password,
    username
  })
  success({
    data: dataValues
  })
})

// 用户登录
router.get('/login', async (ctx) => {
  error({
    data: {
      query: ctx.query || '',
      body: ctx.request.body || '',
    }
  })
})

module.exports = router;