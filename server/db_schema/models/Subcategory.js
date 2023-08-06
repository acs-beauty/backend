"use strict";
const { validateLinkString } = require("../../regex");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    static associate(models) {
      Subcategory.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId",
        targetKey: "categoryId",
      });
      Subcategory.hasMany(models.Product, {
        as: "products",
        foreignKey: "subcategoryId",
        targetKey: "subcategoryId",
      });
    }
  }

  Subcategory.init(
    {
      subcategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      linkKey: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          is: {
            args: validateLinkString,
            msg: "linkKey format is invalid",
          },
        },
        unique: true,
      },
      imageName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: "subcategory_no_image.png",
      },
      imageBannerName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: "subcategory_no_image_banner.png",
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Subcategory",
      tableName: "Subcategories",
      timestamps: false,
    }
  );

  return Subcategory;
};
