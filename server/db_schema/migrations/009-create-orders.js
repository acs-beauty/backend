"use strict";
const {
  OPEN,
  PENDING,
  PAID,
  DELIVERING,
  CONFIRMED,
  COMPLETED,
  CANCELLED,
  REOPENED,
} = require("../../constants");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      orderUUID: {
        type: Sequelize.STRING(36),
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(128),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: Sequelize.STRING(12),
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING(256),
        allowNull: true,
      },
      notCall: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      status: {
        type: Sequelize.ENUM(
          OPEN,
          PENDING,
          PAID,
          DELIVERING,
          CONFIRMED,
          COMPLETED,
          CANCELLED,
          REOPENED
        ),
        allowNull: false,
        defaultValue: PENDING,
      },
      totalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
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

    await queryInterface.addConstraint("Orders", {
      fields: ["phone"],
      type: "check",
      where: {
        phone: Sequelize.where(
          Sequelize.fn("CHAR_LENGTH", Sequelize.col("phone")),
          12
        ),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
