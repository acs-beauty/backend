'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Product, {
        foreignKey: 'productId',
      })
    }
  }

  Image.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      url: {
        type: DataTypes.STRING(250),
        allowNull: false,
        defaultValue: '',
      },
    },
    {
      sequelize,
      modelName: 'Image',
      tableName: 'image',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['id'],
        },
      ],
    }
  )

  return Image
}
