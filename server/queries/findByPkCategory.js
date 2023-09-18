"use strict";
const { Category, Subcategory } = require("../db_schema/models");
const BadRequestError = require("../errors/BadRequestError");

const findByPkCategory = async (categoryId) => {
  try {
    const category = await Category.findOne({
      where: {
        categoryId,
      },
      attributes: ["categoryId", "name", "linkKey", "imageBannerName"],
      include: [
        {
          model: Subcategory,
          as: "subcategories",
          attributes: ["subcategoryId", "name", "linkKey"],
          required: false,
        },
      ],
    });

    if (category) {
      return category.get({ plain: true });
    } else {
      return new BadRequestError("такого айди нема");
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = findByPkCategory;
