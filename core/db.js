const {
  Sequelize,
  Model
} = require('sequelize')
const {
  unset,
  clone,
  isArray
} = require('lodash')
const {
  database
} = require('../config/config')

const sequelize = new Sequelize(database.dbName, database.user, database.password, {
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

Model.prototype.toJSON = function () {
  let data = clone(this.dataValues)
  unset(data, 'created_at')
  unset(data, 'updated_at')
  unset(data, 'deleted_at')
  if (isArray(this.exclude)) {
    this.exclude.forEach(val => {
      unset(data, val)
    });
  }
  return data
}

module.exports = {
  sequelize
}