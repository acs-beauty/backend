'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User.belongsToMany(models.Product, {
      //   through: 'UserFavorite',
      //   foreignKey: 'id',
      //   as: 'favorites',
      // })
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING(64),
        defaultValue: '',
        // allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(64),
        defaultValue: '',
        // allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'email is in an invalid format',
          },
        },
      },
      password: {
        type: DataTypes.STRING(128),
        // allowNull: false,
        defaultValue: '',
      },
      phone: {
        type: DataTypes.STRING(13),
        // allowNull: false,
        defaultValue: '',
        // unique: true,
        // validate: {
        //   len: {
        //     args: [12, 13],
        //     msg: 'Phone number must be 13 characters long',
        //   },
        // },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // refreshToken: {
      //   type: DataTypes.TEXT,
      //   allowNull: true,
      // },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'User',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['id'],
        },
        {
          unique: true,
          // using: 'hash',
          type: 'fulltext',
          fields: ['email'],
        },
      ],
    }
  )
  return User
}
