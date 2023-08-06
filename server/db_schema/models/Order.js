"use strict";
const {
  OPEN,
  PENDING,
  PAID,
  DELIVERING,
  CONFIRMED,
  COMPLETED,
  CANCELLED,
  REOPENED,
} = require("../../constants");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.OrderDetail, {
        as: "orderDetails",
        foreignKey: "orderId",
        targetKey: "orderId",
      });
      Order.hasOne(models.NovaDelivery, {
        as: "novaPost",
        foreignKey: "orderId",
        targetKey: "orderId",
      });
    }
  }

  Order.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      orderUUID: {
        type: DataTypes.STRING(36),
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: "email is in an invalid format",
          },
        },
      },
      phone: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
          len: {
            args: [12, 12],
            msg: "Phone number must be 12 characters long",
          },
        },
      },
      comment: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      notCall: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM(
          OPEN,
          PENDING,
          PAID,
          DELIVERING,
          CONFIRMED,
          COMPLETED,
          CANCELLED,
          REOPENED
        ),
        allowNull: false,
        defaultValue: PENDING,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "Orders",
      timestamps: false,
    }
  );

  return Order;
};
