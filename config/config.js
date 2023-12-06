require('dotenv').config()
const config = {
  username: 'postgres',
  password: 'Roman123',
  database: 'postgres',
  host: 'postgres2.cdo5tzminv4o.eu-north-1.rds.amazonaws.com',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  operatorsAliases: 'Op',
  seederStorage: 'sequelize',
}

module.exports = config
