"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ParameterNames", {
      nameKey: {
        type: Sequelize.STRING(16),
        allowNull: false,
        primaryKey: true,
      },
      value: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ParameterNames");
  },
};