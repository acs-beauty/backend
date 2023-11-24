"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EventSale extends Model {
    static associate(models) {
      EventSale.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId",
        targetKey: "productId",
      });
    }
  }

  EventSale.init(
    {
      eventSaleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Products",
          key: "productId",
        },
      },
      discountPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: "Discount price must be greater than or equal to 0",
          },
        },
      },
      startOfSale: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: true,
        },
      },
      endOfSale: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: true,
          isAfterStartOfSale(value) {
            if (value < this.startOfSale) {
              throw new Error("End of sale must be after start of sale");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "EventSale",
      tableName: "EventSales",
      timestamps: false,
    }
  );

  return EventSale;
};
