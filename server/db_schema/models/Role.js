"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
        targetKey: "userId",
      });
    }
  }

  Role.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      role: {
        type: DataTypes.STRING(12),
        allowNull: false,
        defaultValue: "buyer",
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "Roles",
      timestamps: false,
    }
  );

  return Role;
};
