'use strict'
// const { validateLinkString } = require('../regex')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      Feedback.belongsTo(models.Product, {
        // as: 'brand',
        // foreignKey: 'brandId',
        // targetKey: 'id',
      })
      Feedback.belongsTo(models.User, {
        // as: 'brand',
        // foreignKey: 'brandId',
        // targetKey: 'id',
      })
    }
  }

  Feedback.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      review: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      rating: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          min: 0,
          max: 5,
        },
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM('pending'),
        allowNull: false,
        defaultValue: 'pending',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
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
      modelName: 'Feedback',
      tableName: 'Feedback',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['id'],
        },
        {
          // unique: true,
          fields: ['review'],
        },
        {
          fields: ['status'],
        },
      ],
    }
  )

  return Feedback
}
