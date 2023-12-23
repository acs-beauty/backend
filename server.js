// 'use strict'
require('dotenv').config()
// const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require('./models')

const app = require('./app.js')

const PORT = process.env.API_PORT

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
    // await sequelize.sync()
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
