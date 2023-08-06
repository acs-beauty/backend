"use strict";
const { validateLinkString } = require("../../regex");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Categories", {
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      linkKey: {
        type: Sequelize.STRING(64),
        allowNull: false,
        validate: {
          is: validateLinkString,
        },
        unique: true,
      },
      imageName: {
        type: Sequelize.STRING(128),
        allowNull: false,
        defaultValue: "category_no_image.png",
      },
      imageBannerName: {
        type: Sequelize.STRING(128),
        allowNull: false,
        defaultValue: "category_no_image_banner.png",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Categories");
  },
};
