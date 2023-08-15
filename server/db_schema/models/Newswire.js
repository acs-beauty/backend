"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Newswire extends Model {}

  Newswire.init(
    {
      newswireId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      titleName: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imageBannerName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: "newswire_no_image_banner.png",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Newswire",
      tableName: "Newswires",
      timestamps: false,
    }
  );

  return Newswire;
};
