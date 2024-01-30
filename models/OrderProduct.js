'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    static associate(models) {
      // OrderProduct.belongsTo(models.Product, {
      //   // as: 'brand',
      //   foreignKey: 'id',
      //   // targetKey: 'id',
      // })
      // OrderProduct.belongsTo(models.Order, {
      //   // as: 'brand',
      //   foreignKey: 'id',
      //   // targetKey: 'id',
      // })
    }
  }

  OrderProduct.init(
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      count: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          min: 0,
        },
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'OrderProduct',
      tableName: 'order_product',
      timestamps: false,
      indexes: [
        // {
        //   unique: true,
        //   fields: ['id'],
        // },
        {
          unique: true,
          fields: ['orderId', 'productId'],
        },
      ],
    }
  )

  return OrderProduct
}
