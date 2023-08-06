"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      titleName: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      composition: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      mainImageName: {
        type: Sequelize.STRING(128),
        allowNull: false,
        defaultValue: "product_no_image.png",
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
        defaultValue: 0,
      },
      discountPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        validate: {
          min: 0,
        },
        defaultValue: null,
      },
      subcategoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Subcategories",
          key: "subcategoryId",
        },
      },
      brandId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Brands",
          key: "brandId",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
