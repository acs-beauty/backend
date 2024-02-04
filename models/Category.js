'use strict'
const { validateSlug } = require('../regex')
const { Model } = require('sequelize')
const { IMAGE_BANNER_NAME } = require('../constants')

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Subcategory, {
        as: 'subcategories',
        // inverse: {
        //   as: 'categoryId',
        // },
        foreignKey: 'categoryId',
        // targetKey: "categoryId",
      })
    }
  }

  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      // description: {
      //   type: DataTypes.STRING(500),
      //   defaultValue: '',
      // },
      slug: {
        type: DataTypes.STRING(64),
        allowNull: false,
        // validate: {
        //   is: {
        //     args: validateSlug,
        //     msg: 'linkKey format is invalid',
        //   },
        // },
        unique: true,
      },
      image: {
        type: DataTypes.STRING(250),
        allowNull: false,
        defaultValue: '',
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'Category',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['id'],
        },
      ],
    }
  )

  return Category
}
