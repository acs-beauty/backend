"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("OrderDetails", {
      type: "check",
      fields: ["quantity"],
      where: {
        quantity: {
          [Sequelize.Op.gte]: 0,
        },
      },
    });
    await queryInterface.addConstraint("OrderDetails", {
      type: "check",
      fields: ["totalPricePerItem"],
      where: {
        totalPricePerItem: {
          [Sequelize.Op.gte]: 0,
        },
      },
    });
    await queryInterface.addConstraint("Orders", {
      type: "check",
      fields: ["totalPrice"],
      where: {
        totalPrice: {
          [Sequelize.Op.gte]: 0,
        },
      },
    });
    await queryInterface.addConstraint("Products", {
      type: "check",
      fields: ["price"],
      where: {
        price: {
          [Sequelize.Op.gte]: 0,
        },
      },
    });
    await queryInterface.addConstraint("Products", {
      type: "check",
      fields: ["discountPrice"],
      where: {
        discountPrice: {
          [Sequelize.Op.gte]: 0,
        },
      },
    });
    await queryInterface.addConstraint("Products", {
      type: "check",
      fields: ["quantity"],
      where: {
        quantity: {
          [Sequelize.Op.gte]: 0,
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Products", "Products_quantity_check");
    await queryInterface.removeConstraint("Products", "Products_discountPrice_check");
    await queryInterface.removeConstraint("Products", "Products_price_check");
    await queryInterface.removeConstraint("Orders", "Orders_totalPrice_check");
    await queryInterface.removeConstraint("OrderDetails", "OrderDetails_totalPricePerItem_check");
    await queryInterface.removeConstraint("OrderDetails", "OrderDetails_quantity_check");
  },
};
