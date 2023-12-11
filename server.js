'use strict'
require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')
// const sequelize = require('./connection.js')
const { sequelize } = require('./models')
// const User = require('./models/User.js')
// const { Role } = require('./models/Role.js')

// User.create({
//   id: 1,
//   firstName: 'Jane',
//   lastName: 'Doe',
//   email: 'wefe@gmail.com',
//   password: '12345',
//   phone: '+38095345454',
//   refreshToken: 'wef ji23582389jhiofwh7823423',
// })

// console.log(JSON.stringify(User, null, 4))
// console.log(User(Sequelize, DataTypes))
// User.sync({ alter: true })

const app = require('./app.js')

const PORT = process.env.API_PORT

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
    // await User.sync()
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}!`)
    })
    console.log('Connection with DB has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

start()

// server.keepAliveTimeout = 120 * 1000;
// server.headersTimeout = 120 * 1000;
