// require('dotenv').config()
const Sequelize = require('sequelize')
// console.log('process.env = ', process.env.POSTGRES_PASSWORD)

module.exports = new Sequelize('postgres', 'postgres', 'Roman123', {
  host: 'postgres2.cdo5tzminv4o.eu-north-1.rds.amazonaws.com',
  dialect: process.env.POSTGRES_DIALECT,
  port: process.env.POSTGRES_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})
