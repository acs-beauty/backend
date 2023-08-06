"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Role, {
        as: "roles",
        foreignKey: "userId",
        targetKey: "userId",
      });
      User.belongsToMany(models.Product, {
        through: "UserFavorite",
        foreignKey: "userId",
        as: "favorites",
      });
    }
  }

  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "email is in an invalid format",
          },
        }
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [12, 12],
            msg: "Phone number must be 12 characters long",
          },
        },
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
      modelName: "User",
      tableName: "Users",
      timestamps: false,
    }
  );

  return User;
};
