const SequeLize = require('sequelize')
const {
  database
} = require('../config/config')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(database.dbName,database.user,database.password, {
  dialect: 'mysql',
  host: database.host,
  port: database.port,
  logging: false, // 日志
  titmezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: "created_at", // 自定义自动生成的字段名
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  }
})

sequelize.sync({
  force: false // 同步更新字段
})

module.exports = {
  sequelize
}