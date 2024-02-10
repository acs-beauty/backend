'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Product, {
        as: 'products',
        through: models.OrderProduct,
        foreignKey: 'orderId',
      })
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: true,
        defaultValue: null,
      },
      lastName: {
        type: DataTypes.STRING(64),
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'email is in an invalid format',
          },
        },
      },
      phone: {
        type: DataTypes.STRING(13),
        unique: true,
        allowNull: true,
        // defaultValue: null,
      },
      status: {
        type: DataTypes.ENUM('pending', 'paid'),
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: {
            args: [['pending', 'paid']],
            msg: 'Must be pending or paid',
          },
        },
      },
      deliveryType: {
        type: DataTypes.ENUM('novaPoshta', 'ukrPoshta', 'selfDelivery'),
        allowNull: false,
        defaultValue: 'novaPoshta',
        validate: {
          isIn: {
            args: [['novaPoshta', 'ukrPoshta', 'selfDelivery']],
            msg: 'Must be novaPoshta, ukrPoshta or selfDelivery',
          },
        },
      },
      address: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: '',
      },
      paymentType: {
        type: DataTypes.ENUM('card', 'cash'),
        allowNull: false,
        defaultValue: 'card',
        validate: {
          isIn: {
            args: [['card', 'cash']],
            msg: 'Must be card or cash',
          },
        },
      },
      tth: {
        type: DataTypes.BIGINT,
        unique: true,
      },
      // email: {
      //   type: DataTypes.STRING(128),
      //   allowNull: false,
      //   validate: {
      //     isEmail: {
      //       args: true,
      //       msg: 'email is in an invalid format',
      //     },
      //   },
      // },
      // phone: {
      //   type: DataTypes.STRING(12),
      //   allowNull: false,
      //   validate: {
      //     len: {
      //       args: [12, 12],
      //       msg: 'Phone number must be 12 characters long',
      //     },
      //   },
      // },
      comment: {
        type: DataTypes.STRING(256),
        allowNull: false,
        defaultValue: '',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'order',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['id'],
        },
        {
          // type: 'fulltext',
          fields: ['firstName'],
        },
        {
          // type: 'fulltext',
          fields: ['lastName'],
        },
        {
          unique: true,
          type: 'fulltext',
          fields: ['tth'],
        },
        {
          // type: 'fulltext',
          fields: ['status'],
        },
        {
          // type: 'fulltext',
          unique: true,
          fields: ['phone'],
        },
        {
          unique: true,
          // type: 'fulltext',
          fields: ['email'],
        },
      ],
    }
  )

  return Order
}
