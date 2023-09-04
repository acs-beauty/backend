"use strict";
const { Category, Subcategory } = require("../db_schema/models");

const updateCategoryOrSub = async (id, body, isCategory) => {
  const model = isCategory ? Category : Subcategory;
  const where = isCategory ? { categoryId: id } : { subcategoryId: id };

  try {
    const [updateCategory] = await model.update(
      {
        ...body,
      },
      { where }
    );

    return updateCategory;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = updateCategoryOrSub;
