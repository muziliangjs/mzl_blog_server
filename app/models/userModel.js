const {
  sequelize
} = require('../../core/db')
const {
  Sequelize,
  Model,
} = require('sequelize')

class User extends Model {
  // 不能用 constructor
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
  static async getUserByOpenid(username){
    const user = User.findOne({
      where:{
        username
      }
    })
    return user
  }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
}, {
  sequelize,
  tableName: 'article'
})

module.exports = {
  User
}