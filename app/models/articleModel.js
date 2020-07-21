const {
  sequelize
} = require('../../core/db')
var moment = require('moment');
const {
  Sequelize,
  Model,
} = require('sequelize')

class Article extends Model {
  // 不能用 constructor
  static async createArticle(article) {
    return await Article.create(article);
  }

  static async updateArticle(article, id) {
    return await Article.update(article, {
      where: {
        id
      }
    });
  }

  static async getArticleList(label_id, page, limit) {
    let list
    if (label_id != '' && label_id != 0) {
      // list = await Article.findAll({ 分页
      // 联表查询
      list = await Article.findAndCountAll({
        order: [
          ['id', 'desc']
        ],
        where: {
          label_id
        },
        offset: (page - 1) * limit,
        limit: parseInt(limit),
      });
    } else {
      list = await Article.findAndCountAll({
        order: [
          ['id', 'desc']
        ],
        offset: (page - 1) * limit,
        limit: parseInt(limit),
      });
    }
    return list
  }

  static async getFindById(id) {
    return await Article.findOne({
      where: {
        id
      }
    })
  }

  static async delLabel(id) {
    const isSuc = await Article.destroy({
      where: {
        id
      }
    })
    return isSuc
  }
}

Article.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author_id: {
    type: Sequelize.INTEGER,
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  content: Sequelize.TEXT,
  create_time: {
    type: Sequelize.STRING,
    defaultValue: moment().format("YYYY-MM-DD"),
  },
  // view: {
  //   type: Sequelize.INTEGER,
  //   defaultValue: 0,
  // },
  label: Sequelize.STRING,
  label_id: Sequelize.INTEGER,
}, {
  sequelize,
  tableName: 'article'
})

module.exports = {
  Article
}