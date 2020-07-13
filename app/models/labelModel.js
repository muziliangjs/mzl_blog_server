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
    const tempLabel = await Label.findOne({
      where: {
        label
      }
    })
    if (tempLabel) {
      throw new global.errs.ParamsError({
        msg: '标签已存在',
      })
    }
    return await Label.create({
      label
    });
  }

  // 
  static async getLabelList() {
    return await Label.findAll();
  }

  // del
  static async delLabel(id){
    const isSuc = await Label.destroy({
      where:{id}
    })
    return isSuc
  }
  // toJSON() {
  //   return {
  //     id: this.getDataValue('id'),
  //     label: this.getDataValue('label'),
  //   }
  // }
}

// Label.prototype.exclude = ['id']

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