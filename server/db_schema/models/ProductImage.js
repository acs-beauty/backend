"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    static associate(models) {
      ProductImage.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId",
        targetKey: "productId",
      });
    }
  }

  ProductImage.init(
    {
      productImagesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      imageName: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductImage",
      tableName: "ProductImages",
      timestamps: false,
    }
  );

  return ProductImage;
};
