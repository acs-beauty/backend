const { UNKNOWN } = require("../../constants");

const unknownCategory = {
  name: UNKNOWN,
  linkKey: UNKNOWN,
  disabled: true,
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", [unknownCategory], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
