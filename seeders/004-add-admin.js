const { User } = require("../models");
const bcrypt = require("bcrypt");
const { ADMIN, BUYER } = require("../../constants");

const userAdmin = {
  firstName: process.env.ADMIN_FIRST_NAME,
  lastName: process.env.ADMIN_LAST_NAME,
  email: process.env.ADMIN_EMAIL,
  phone: process.env.ADMIN_PHONE,
  password: bcrypt.hashSync(
    process.env.ADMIN_PASSWORD,
    +process.env.SALT_ROUNDS
  ),
  createdAt: new Date(),
  updatedAt: new Date(),
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [userAdmin], {});

    const admin = await User.findOne({
      where: {
        email: process.env.ADMIN_EMAIL,
      },
    });

    await queryInterface.bulkInsert(
      "Roles",
      [
        { userId: admin.userId, role: ADMIN },
        { userId: admin.userId, role: BUYER },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
