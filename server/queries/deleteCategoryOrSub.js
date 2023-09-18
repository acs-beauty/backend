"use strict";
const { Category, Subcategory, Sequelize } = require("../db_schema/models");
const { UNKNOWN } = require("../constants");

const deleteCategoryOrSub = async (id, isCategory) => {
  const model = isCategory ? Category : Subcategory;
  const where = isCategory ? { categoryId: id } : { subcategoryId: id };

  try {
    const isDelete = await model.destroy({
      where: {
        ...where,
        linkKey: {
          [Sequelize.Op.not]: UNKNOWN,
        },
      },
    });

    return !!isDelete;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = deleteCategoryOrSub;
