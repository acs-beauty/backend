"use strict";
const { Category, Subcategory } = require("../db_schema/models");

const createCategoryOrSub = async (body, isCategory) => {
  const model = isCategory ? Category : Subcategory;
  try {
    const newCategory = await model.create({
      ...body,
    });

    return newCategory;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = createCategoryOrSub;
