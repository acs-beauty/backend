"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.Order, {
        as: "order",
        foreignKey: "orderId",
        targetKey: "orderId",
      });
      OrderDetail.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId",
        targetKey: "productId",
      });
    }
  }

  OrderDetail.init(
    {
      orderDetailId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
        defaultValue: 0,
      },
      totalPricePerItem: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "OrderDetail",
      tableName: "OrderDetails",
      timestamps: false,
    }
  );

  return OrderDetail;
};
