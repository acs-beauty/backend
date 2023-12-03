"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Parameter extends Model {
    static associate(models) {
      Parameter.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId",
        targetKey: "productId",
      });
    }
  }

  Parameter.init(
    {
      parameterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      // Вік
      age: {
        type: DataTypes.STRING(16),
        allowNull: true,
        defaultValue: null,
      },
      // Об'єм тари
      volume: {
        type: DataTypes.STRING(16),
        allowNull: true,
        defaultValue: null,
      },
      // Тип шкіри
      skinType: {
        type: DataTypes.STRING(64),
        allowNull: true,
        defaultValue: null,
      },
      // Ступінь захисту
      protectionLevel: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: null,
      },
      // Тип волосся
      hairType: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: null,
      },
      // Час нанесення
      applyTime: {
        type: DataTypes.STRING(64),
        allowNull: true,
        defaultValue: null,
      },
      // Колір
      color: {
        type: DataTypes.STRING(64),
        allowNull: true,
        defaultValue: null,
      },
      // Ефект
      effect: {
        type: DataTypes.STRING(64),
        allowNull: true,
        defaultValue: null,
      },
      // Тип засобу
      productType: {
        type: DataTypes.STRING(32),
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Parameter",
      tableName: "Parameters",
      timestamps: false,
    }
  );

  return Parameter;
};
