"use strict";
const { validateLinkString } = require("../../regex");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Brands", {
      brandId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      redirectUrl: {
        type: Sequelize.STRING(256),
        allowNull: true,
        validate: {
          isUrl: true,
        }
      },
      linkKey: {
        type: Sequelize.STRING(64),
        allowNull: false,
        validate: {
          is: validateLinkString,
        },
        unique: true,
      },
      country: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imageName: {
        type: Sequelize.STRING(128),
        allowNull: false,
        defaultValue: "brand_no_image.png",
      },
      imageBannerName: {
        type: Sequelize.STRING(128),
        allowNull: false,
        defaultValue: "brand_no_image_banner.png",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Brands");
  },
};
