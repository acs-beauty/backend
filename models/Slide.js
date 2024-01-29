'use strict'
// const { validateSlug } = require('../regex')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    static associate(models) {
      // Slide.hasMany(models.Product, {
      //   // as: "products",
      //   foreignKey: 'brandId',
      //   // targetKey: "brandId",
      // })
    }
  }

  Slide.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      desktopBanner: {
        type: DataTypes.STRING(250),
        allowNull: false,
        defaultValue: '',
      },
      mobileBanner: {
        type: DataTypes.STRING(250),
        allowNull: false,
        defaultValue: '',
      },
      priority: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Slide',
      tableName: 'slide',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['id'],
        },
        {
          // unique: true,
          // type: 'fulltext',
          fields: ['priority'],
        },
      ],
    }
  )

  return Slide
}
