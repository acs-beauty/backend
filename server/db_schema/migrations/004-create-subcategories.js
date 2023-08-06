"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Subcategories", {
      subcategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "categoryId",
        },
      },
      name: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      linkKey: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true,
      },
      imageName: {
        type: Sequelize.STRING(128),
        allowNull: false,
        defaultValue: "subcategory_no_image.png",
      },
      imageBannerName: {
        type: Sequelize.STRING(128),
        allowNull: false,
        defaultValue: "subcategory_no_image_banner.png",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Subcategories");
  },
};
