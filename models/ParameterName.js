"use strict";
const { camelCaseString } = require("../../regex");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ParameterName extends Model {
    static associate(models) {}
  }

  ParameterName.init(
    {
      nameKey: {
        type: DataTypes.STRING(16),
        primaryKey: true,
        allowNull: false,
        validate: {
          is: {
            args: camelCaseString,
            msg: "nameKey format is invalid",
          },
        },
      },
      value: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ParameterName",
      tableName: "ParameterNames",
      timestamps: false,
    }
  );

  return ParameterName;
};
