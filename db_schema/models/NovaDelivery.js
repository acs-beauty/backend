"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class NovaDelivery extends Model {
    static associate(models) {
      NovaDelivery.belongsTo(models.Order, {
        as: "order",
        foreignKey: "orderId",
      });
    }
  }

  NovaDelivery.init(
    {
      novaDeliveryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      getToWarehouse: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      areaName: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      cityName: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      cityFullName: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      cityRef: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      warehouseStreet: {
        type: DataTypes.STRING(64),
        allowNull: true,
        validate: {
          checkIfRequired() {
            if (this.getToWarehouse && !this.warehouseStreet) {
              throw new Error(
                "Street name is required when getting to warehouse"
              );
            }
          },
        },
      },
      warehouseRef: {
        type: DataTypes.STRING(36),
        allowNull: true,
        validate: {
          checkIfRequired() {
            if (this.getToWarehouse && !this.warehouseRef) {
              throw new Error(
                "Warehouse ref is required when getting to warehouse"
              );
            }
          },
        },
      },
      courierDeliveryAddress: {
        type: DataTypes.STRING(128),
        allowNull: true,
        validate: {
          checkIfRequired() {
            if (!this.getToWarehouse && !this.courierDeliveryAddress) {
              throw new Error(
                "Courier delivery address is required when not getting to warehouse"
              );
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "NovaDelivery",
      tableName: "NovaDelivery",
      timestamps: false,
    }
  );

  return NovaDelivery;
};
