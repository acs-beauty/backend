"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EventSales", {
      eventSaleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "productId",
        },
      },
      discountPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      startOfSale: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      endOfSale: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addConstraint("EventSales", {
      fields: ["discountPrice"],
      type: "check",
      where: {
        discountPrice: {
          [Sequelize.Op.gte]: 0,
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("EventSales");
  },
};
