'use strict'

// const { DataTypes } = require('sequelize')
// const sequelize = require('../../connection')
// const { Role } = require('./Role.js')

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Role, Product }) {
      User.hasMany(Role, {
        as: 'roles',
        foreignKey: 'id',
        targetKey: 'userId',
      })
      User.belongsToMany(Product, {
        through: 'UserFavorite',
        foreignKey: 'id',
        as: 'favorites',
      })
    }
  }

  User.init(
    'User',
    {
      id: {
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
            msg: 'email is in an invalid format',
          },
        },
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(13),
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [12, 12],
            msg: 'Phone number must be 12 characters long',
          },
        },
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      timestamps: true,
      createdAt: 'createdDate',
      updatedAt: 'updatedDate',
      indexes: [
        {
          unique: true,
          fields: ['id'],
        },
        {
          unique: true,
          fields: ['email'],
        },
      ],
    }
  )
}

// User.hasMany(Role)
// Role.belongsTo(User)

// module.exports = { User }

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     static associate(models) {
//       User.hasMany(models.Role, {
//         as: 'roles',
//         foreignKey: 'userId',
//         targetKey: 'userId',
//       })
//       User.belongsToMany(models.Product, {
//         through: 'UserFavorite',
//         foreignKey: 'userId',
//         as: 'favorites',
//       })
//     }
//   }

//   User.init(
//     {
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       firstName: {
//         type: DataTypes.STRING(64),
//         allowNull: false,
//       },
//       lastName: {
//         type: DataTypes.STRING(64),
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING(128),
//         allowNull: false,
//         unique: true,
//         validate: {
//           isEmail: {
//             args: true,
//             msg: 'email is in an invalid format',
//           },
//         },
//       },
//       password: {
//         type: DataTypes.STRING(128),
//         allowNull: false,
//       },
//       phone: {
//         type: DataTypes.STRING(12),
//         allowNull: false,
//         unique: true,
//         validate: {
//           len: {
//             args: [12, 12],
//             msg: 'Phone number must be 12 characters long',
//           },
//         },
//       },
//       refreshToken: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       createdAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//       },
//       updatedAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'User',
//       tableName: 'Users',
//       timestamps: false,
//     }
//   )

//   return User
// }
