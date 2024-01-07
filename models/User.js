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
      User.hasMany(models.Feedback, {
        // as: 'products',
        foreignKey: 'userId',
        // targetKey: 'subcategoryId',
      })
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
      avatar: {
        type: DataTypes.STRING(120),
        allowNull: false,
        defaultValue: '',
      },
      firstName: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        // allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        // allowNull: false,
      },
      note: {
        type: DataTypes.STRING(64),
        defaultValue: '',
        // allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
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
        type: DataTypes.STRING(100),
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
          fields: ['phone'],
        },
        {
          fields: ['firstName'],
        },
        {
          fields: ['lastName'],
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
