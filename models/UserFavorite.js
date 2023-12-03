"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserFavorite extends Model {
    static associate(models) {}
  }

  UserFavorite.init(
    {
      userFavoriteId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserFavorite",
      tableName: "UserFavorites",
      timestamps: false,
    }
  );

  return UserFavorite;
};
