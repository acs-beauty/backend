const config = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: process.env.POSTGRES_DIALECT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    // useUTC: true,
  },
  logging: false,
  // cli: {
  //   migrationsDir: 'migrations',
  // },
  operatorsAliases: process.env.OPERATOR_ALIASES,
  seederStorage: process.env.SEEDER_STORAGE,
  // timezone: '+02:00',
  // timezone: 'Europe/Kiev',
}

module.exports = config
