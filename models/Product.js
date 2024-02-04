'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Subcategory, {
        // as: 'subcategory',
        foreignKey: 'id',
        // targetKey: 'subcategoryId',
      })
      Product.belongsTo(models.Brand, {
        // as: 'brand',
        foreignKey: 'id',
        // targetKey: 'id',
      })
      Product.hasMany(models.Feedback, {
        // as: 'products',
        foreignKey: 'productId',
        // targetKey: 'subcategoryId',
      })
      Product.hasMany(models.Image, {
        as: 'images',
        foreignKey: 'productId',
      })
      Product.belongsToMany(models.Order, {
        // as: 'products',
        through: models.OrderProduct,
        foreignKey: 'productId',
      })
      // Product.belongsToMany(models.User, {
      //   through: 'UserFavorite',
      //   foreignKey: 'id',
      //   as: 'users',
      // })
      // Product.hasMany(models.ProductImage, {
      //   as: 'images',
      //   foreignKey: 'productImageId',
      //   targetKey: 'id',
      // })
    }
  }

  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        validate: {
          min: 0,
        },
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.DECIMAL(10, 1),
        // allowNull: true,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      // subcategoryId: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      // },
      // parameterId: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      // },
      // productImageId: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      // },
      // brand: {
      //   allowNull: false,
      //   type: DataTypes.STRING(60),
      //   defaultValue: '',
      // },
      count: {
        type: DataTypes.SMALLINT,
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
      // promotion: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: false,
      //   defaultValue: false,
      // },
      // disabled: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: false,
      //   defaultValue: false,
      // },
      // createdAt: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      //   defaultValue: DataTypes.NOW,
      // },
      // updatedAt: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      //   defaultValue: DataTypes.NOW,
      // },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'product',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['id'],
        },
        {
          // unique: true,
          fields: ['price'],
        },
        {
          // unique: true,
          fields: ['discount'],
        },
        {
          // unique: true,
          fields: ['count'],
        },
        {
          // unique: true,
          // using: 'gin',
          // operator: 'jsonb_ops',
          fields: ['name'],
        },
      ],
    }
  )

  return Product
}
