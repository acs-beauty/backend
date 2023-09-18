"use strict";
const { Category, Subcategory, Sequelize } = require("../db_schema/models");
const { UNKNOWN } = require("../constants");

const updateCategoryOrSub = async (id, body, isCategory) => {
  const model = isCategory ? Category : Subcategory;
  const where = isCategory ? { categoryId: id } : { subcategoryId: id };

  try {
    const [updateCategory] = await model.update(
      {
        ...body,
      },
      {
        where: {
          ...where,
          linkKey: {
            [Sequelize.Op.not]: UNKNOWN,
          },
        },
      }
    );

    return updateCategory;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = updateCategoryOrSub;
