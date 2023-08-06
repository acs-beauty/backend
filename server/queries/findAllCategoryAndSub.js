"use strict";
const { Category, Subcategory } = require("../db_schema/models");

const findAllCategoryAndSub = async () => {
  try {
    const categoryAndSub = await Category.findAll({
      attributes: ["categoryId", "name", "linkKey"],
      include: {
        model: Subcategory,
        as: "subcategory",
        attributes: ["subcategoryId", "name", "linkKey"],
      },
    });
    return categoryAndSub;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = findAllCategoryAndSub;
