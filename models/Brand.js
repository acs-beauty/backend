'use strict'
// const { validateLinkString } = require('../regex')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      Brand.hasMany(models.Product, {
        // as: "products",
        // foreignKey: "brandId",
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
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      // redirectUrl: {
      //   type: DataTypes.STRING(256),
      //   allowNull: true,
      //   validate: {
      //     isUrl: {
      //       args: true,
      //       msg: 'redirectUrl format is invalid',
      //     },
      //   },
      // },
      // linkKey: {
      //   type: DataTypes.STRING(64),
      //   allowNull: false,
      //   validate: {
      //     is: {
      //       args: validateLinkString,
      //       msg: "linkKey format is invalid",
      //     },
      //   },
      //   unique: true,
      // },
      // country: {
      //   type: DataTypes.STRING(32),
      //   allowNull: false,
      // },
      // description: {
      //   type: DataTypes.TEXT,
      //   allowNull: false,
      // },
      // imageName: {
      //   type: DataTypes.STRING(128),
      //   allowNull: false,
      //   defaultValue: "brand_no_image.png",
      // },
      // imageBannerName: {
      //   type: DataTypes.STRING(128),
      //   allowNull: false,
      //   defaultValue: "brand_no_image_banner.png",
      // },
    },
    {
      sequelize,
      modelName: 'Brand',
      tableName: 'Brand',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['id'],
        },
      ],
    }
  )

  return Brand
}
