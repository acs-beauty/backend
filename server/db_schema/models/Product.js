"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Subcategory, {
        as: "subcategory",
        foreignKey: "subcategoryId",
        targetKey: "subcategoryId",
      });
      Product.belongsTo(models.Brand, {
        as: "brand",
        foreignKey: "brandId",
        targetKey: "brandId",
      });
      Product.hasOne(models.Parameter, {
        as: "parameter",
        foreignKey: "productId",
      });
      Product.belongsToMany(models.User, {
        through: "UserFavorite",
        foreignKey: "productId",
        as: "users",
      });
      Product.hasMany(models.ProductImage, {
        as: "images",
        foreignKey: "productId",
        targetKey: "productId",
      });
      // Product.hasMany(models.OrderDetail, {
      //   as: "orderDetails",
      //   foreignKey: "productId",
      //   targetKey: "productId",
      // });
    }
  }

  Product.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      titleName: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      composition: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      mainImageName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: "product_no_image.png",
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
        defaultValue: 0,
      },
      discountPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
          min: 0,
        },
        defaultValue: null,
      },
      subcategoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      brandId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
        defaultValue: 0,
      },
      novelty: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      hit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      modelName: "Product",
      tableName: "Products",
      timestamps: false,
    }
  );

  return Product;
};
