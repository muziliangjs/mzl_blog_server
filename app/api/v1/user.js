const Router = require('koa-router')
// const bcrypt = require('bcryptjs')
const {
  generateToken
} = require('../../../core/utils')
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
  const user = await User.getUserByUsername(username)
  if (user) error({
    msg: '用户已存在'
  })
  // 10 位数成本
  // const salt = bcrypt.genSaltSync(10)
  // const psw = bcrypt.hashSync(password, salt)
  const createUser = await User.registerUser({
    password,
    // username: psw
    username
  })
  success({
    data: {
      id: createUser.id,
      username: createUser.username
    }
  })
})

// 用户登录
router.post('/login', async (ctx) => {
  const {
    password,
    username
  } = ctx.request.body;
  if (!username || !password) {
    error({
      msg: '账号密码不能为空'
    })
  }
  const user = await User.verifyPassword(username, password)
  success({
    data: {
      token: generateToken(user.id, 2),
    }
  })
})

module.exports = router;