const { Category } = require("../models");
const { UNKNOWN } = require("../../constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const unknownCategory = await Category.findOne({
      where: {
        linkKey: UNKNOWN,
      },
    });

    if (!unknownCategory) {
      throw new Error("Category with linkKey 'unknown' not found.");
    }

    const unknownSubcategory = {
      categoryId: unknownCategory.categoryId,
      name: UNKNOWN,
      linkKey: UNKNOWN,
      disabled: true,
    };

    await queryInterface.bulkInsert("Subcategories", [unknownSubcategory], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Subcategories", null, {});
  },
};
