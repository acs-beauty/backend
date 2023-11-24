"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Newswires", {
      newswireId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      titleName: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imageBannerName: {
        type: Sequelize.STRING(128),
        allowNull: false,
        defaultValue: "newswire_no_image_banner.png",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Newswires");
  },
};
