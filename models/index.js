"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
// const config = require(__dirname + "/../config/postgresConfig.js");
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
// sequelize = new Sequelize("postgres", process.env.POSTGRES_USER, process.env.POSTGRES_DB, {
//   dialect: 'postgres',
//   host: process.env.POSTGRES_HOST,
//   post: 5000,
//   logging: false,
  // dialectOptions: {
  //   ssl: false,
  // },
// })
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 &&
//       file !== basename &&
//       file.slice(-3) === ".js" &&
//       file.indexOf(".test.js") === -1
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

module.exports = {};
