const {
  sequelize
} = require('../../core/db')
const bcrypt = require('bcryptjs')
const {
  Sequelize,
  Model,
} = require('sequelize')

  // 不能用 constructor
class User extends Model {
  // 注册用户
  static async registerUser({
    password,
    username
  }) {
    return await User.create({
      password,
      username
    });
  }

  // 检测用户是否存在
  static async getUserByUsername(username) {
    const user = await User.findOne({
      where: {
        username
      }
    })
    return user
  }

  // 判断密码是否正确
  static async verifyPassword(username, plainPassword) {
    const user = await User.getUserByUsername(username)
    if (!user) {
      throw new global.errs.ParamsError({
        msg: '用户不存在',
      })
    }
    // 效验数据库里加密的密码 和传过来的没加密密码 
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new global.errs.ParamsError({
        msg: '密码错误',
      })
    }
    return user
  }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  }
}, {
  sequelize,
  tableName: 'users'
})

module.exports = {
  User
}