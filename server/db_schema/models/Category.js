"use strict";
const { validateLinkString } = require("../../regex");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Subcategory, {
        as: "subcategories",
        foreignKey: "categoryId",
        targetKey: "categoryId",
      });
    }
  }

  Category.init(
    {
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
        defaultValue: "category_no_image.png",
      },
      imageBannerName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: "category_no_image_banner.png",
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "Categories",
      timestamps: false,
    }
  );

  return Category;
};
