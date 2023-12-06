const Sequelize = require('sequelize')

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
