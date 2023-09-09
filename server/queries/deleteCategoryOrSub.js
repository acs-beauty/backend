"use strict";
const { Category, Subcategory } = require("../db_schema/models");

const deleteCategoryOrSub = async (id, isCategory) => {
  const model = isCategory ? Category : Subcategory;
  const where = isCategory ? { categoryId: id } : { subcategoryId: id };

  try {
    const isDelete = await model.destroy({
      where,
    });

    return !!isDelete;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = deleteCategoryOrSub;
