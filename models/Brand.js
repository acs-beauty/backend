'use strict'
// const { validateLinkString } = require('../regex')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      Brand.hasMany(models.Product, {
        // as: "products",
        foreignKey: "brandId",
        // targetKey: "brandId",
      })
    }
  }

  Brand.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      logo: {
        type: DataTypes.STRING(250),
        allowNull: false,
        defaultValue: '',
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        // defaultValue: '',
      },
      description: {
        type: DataTypes.STRING(500),
        defaultValue: '',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Brand',
      tableName: 'brand',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['id'],
        },
        {
          unique: true,
          type: 'fulltext',
          fields: ['name'],
        },
      ],
    }
  )

  return Brand
}
