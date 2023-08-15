"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MainSlider extends Model {}

  MainSlider.init(
    {
      mainSliderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      slideName: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      redirectUrl: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      imageDesktopName: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      imageMobileName: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      index: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "MainSlider",
      tableName: "MainSlider",
      timestamps: false,
    }
  );

  return MainSlider;
};
