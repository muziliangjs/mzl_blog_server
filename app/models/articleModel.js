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
}, {
  sequelize,
  tableName: 'article'
})

module.exports = {
  Article
}