"use strict";
const { Category, Subcategory } = require("../db_schema/models");

const findAllCategoryAndSub = async (isAdmin) => {
  const whereDisabled = isAdmin ? {} : { disabled: false };
  const attributeDisabled = isAdmin ? ["disabled", "imageBannerName"] : [];

  try {
    const categoryAndSub = await Category.findAll({
      attributes: ["categoryId", "name", "linkKey", ...attributeDisabled],
      where: { ...whereDisabled },
      include: {
        model: Subcategory,
        as: "subcategory",
        attributes: ["subcategoryId", "name", "linkKey", ...attributeDisabled],
        where: { ...whereDisabled },
        required: false,
      },
    });
    return categoryAndSub;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = findAllCategoryAndSub;
