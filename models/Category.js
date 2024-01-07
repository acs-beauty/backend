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
      // imageName: { // DELETE !!!
      //   type: DataTypes.STRING(128),
      //   allowNull: false,
      //   defaultValue: "category_no_image.png",
      // },
      // imageBannerName: {
      //   type: DataTypes.STRING(128),
      //   allowNull: false,
      //   defaultValue: IMAGE_BANNER_NAME,
      // },
      // disabled: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: false,
      //   defaultValue: false,
      // },
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
