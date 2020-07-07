const {
  sequelize
} = require('../../core/db')
const {
  Sequelize,
  Model,
} = require('sequelize')

class Article extends Model {
  // 不能用 constructor

}

Article.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  content: Sequelize.STRING,
  create_time: {
    type: Sequelize.DATE,
    // 默认设置当前时间
    defaultValue: Sequelize.NOW
  },
  view: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  label: Sequelize.STRING,
  label_id: Sequelize.INTEGER,
}, {
  sequelize,
  tableName: 'article'
})

module.exports = {
  Article
}