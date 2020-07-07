const {
  sequelize
} = require('../../core/db')
const {
  Sequelize,
  Model,
} = require('sequelize')

class Label extends Model {
  // 不能用 constructor
  static async createLabel(label) {
    return await Label.create({
      label
    });
  }  
  
  static async getLabelList() {
    return await Label.findAll();
  }
}

Label.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  label: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'label'
})

module.exports = {
  Label
}