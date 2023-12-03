"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MainSlider", {
      mainSliderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      slideName: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      redirectUrl: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      imageDesktopName: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      imageMobileName: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      index: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      disabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MainSlider");
  },
};
