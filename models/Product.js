'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Subcategory, {
        // as: 'subcategory',
        // foreignKey: 'subcategoryId',
        // targetKey: 'subcategoryId',
      })
      Product.belongsTo(models.Brand, {
        // as: 'brand',
        // foreignKey: 'brandId',
        // targetKey: 'id',
      })
      // Product.hasOne(models.Parameter, {
      //   as: 'parameter',
      //   foreignKey: 'parameterId',
      //   targetKey: 'id',
      // })
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
      // Product.hasMany(models.OrderDetail, {
      //   as: "orderDetails",
      //   foreignKey: "id",
      //   targetKey: "id",
      // });
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
      // composition: {
      //   type: DataTypes.TEXT,
      //   allowNull: true,
      //   defaultValue: null,
      // },
      // mainImageName: {
      //   type: DataTypes.STRING(128),
      //   allowNull: false,
      //   defaultValue: 'product_no_image.png',
      // },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        validate: {
          min: 0,
        },
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2),
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
      // quantity: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   validate: {
      //     min: 0,
      //   },
      //   defaultValue: 0,
      // },
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
      // disabled: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: false,
      //   defaultValue: false,
      // },
      // createdAt: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      //   defaultValue: DataTypes.NOW,
      // },
      // updatedAt: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      //   defaultValue: DataTypes.NOW,
      // },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'Product',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['id'],
        },
        // {
        //   unique: true,
        //   using: 'gin',
        //   fields: ['name'],
        // },
      ],
    }
  )

  return Product
}
