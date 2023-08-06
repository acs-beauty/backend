"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("NovaDelivery", {
      novaDeliveryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Orders",
          key: "orderId",
        },
        onDelete: "CASCADE",
      },
      getToWarehouse: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      areaName: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      cityName: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      cityFullName: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      cityRef: {
        type: Sequelize.STRING(36),
        allowNull: false,
      },
      warehouseStreet: {
        type: Sequelize.STRING(64),
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
        type: Sequelize.STRING(36),
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
        type: Sequelize.STRING(128),
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("NovaDelivery");
  },
};
