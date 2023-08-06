"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Parameters", {
      parameterId: {
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
      // Вік
      age: {
        type: Sequelize.STRING(16),
        allowNull: true,
        defaultValue: null,
      },
      // Об'єм тари
      volume: {
        type: Sequelize.STRING(16),
        allowNull: true,
        defaultValue: null,
      },
      // Тип шкіри
      skinType: {
        type: Sequelize.STRING(64),
        allowNull: true,
        defaultValue: null,
      },
      // Ступінь захисту
      protectionLevel: {
        type: Sequelize.STRING(128),
        allowNull: true,
        defaultValue: null,
      },
      // Тип волосся
      hairType: {
        type: Sequelize.STRING(128),
        allowNull: true,
        defaultValue: null,
      },
      // Час нанесення
      applyTime: {
        type: Sequelize.STRING(64),
        allowNull: true,
        defaultValue: null,
      },
      // Колір
      color: {
        type: Sequelize.STRING(64),
        allowNull: true,
        defaultValue: null,
      },
      // Ефект
      effect: {
        type: Sequelize.STRING(64),
        allowNull: true,
        defaultValue: null,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Parameters");
  },
};
