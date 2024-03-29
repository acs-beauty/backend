'use strict'
// const { validateSlug } = require('../regex')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      Feedback.belongsTo(models.Product, {
        // as: 'brand',
        foreignKey: 'productId',
        // targetKey: 'id',
      })
      Feedback.belongsTo(models.User, {
        // as: 'brand',
        foreignKey: 'userId',
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
      // userId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   // autoIncrement: true,
      //   primaryKey: true,
      // },
      review: {
        type: DataTypes.STRING(250),
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
        type: DataTypes.ENUM('pending', 'published'),
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: {
            args: [['pending', 'published']],
            msg: 'Must be pending or published',
          },
        },
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
      //       args: validateSlug,
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
        {
          fields: ['rating'],
        },
      ],
    }
  )

  return Feedback
}
