'use strict'
// const { validateSlug } = require('../regex')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      // News.hasMany(models.Product, {
      //   // as: "products",
      //   foreignKey: 'brandId',
      //   // targetKey: "brandId",
      // })
    }
  }

  News.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      banner: {
        type: DataTypes.STRING(250),
        allowNull: false,
        defaultValue: '',
      },
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        // defaultValue: '',
      },
      text: {
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
      modelName: 'News',
      tableName: 'news',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['id'],
        },
        {
          unique: true,
          // type: 'fulltext',
          fields: ['title'],
        },
      ],
    }
  )

  return News
}
