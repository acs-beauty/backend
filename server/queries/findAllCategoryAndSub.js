"use strict";
const {
  Category,
  Subcategory,
  Product,
  Sequelize,
} = require("../db_schema/models");

const findAllCategoryAndSub = async (isAdmin) => {
  const whereDisabled = isAdmin ? {} : { disabled: false };
  const attributeDisabled = isAdmin ? ["disabled", "imageBannerName"] : [];
  const count = isAdmin
    ? [
        [
          Sequelize.literal(
            `CAST(COUNT("subcategories->products"."productId") AS INTEGER)`
          ),
          "productCount",
        ],
      ]
    : [];

  try {
    const categoryAndSub = await Category.findAll({
      attributes: ["categoryId", "name", "linkKey", ...attributeDisabled],
      where: { ...whereDisabled },
      include: {
        model: Subcategory,
        as: "subcategories",
        attributes: [
          "subcategoryId",
          "name",
          "linkKey",
          ...attributeDisabled,
          ...count,
        ],
        required: !isAdmin,
        where: { ...whereDisabled },
        order: [["name", "ASC"]],
        include: {
          model: Product,
          as: "products",
          where: { ...whereDisabled },
          attributes: [],
          required: !isAdmin,
        },
      },
      group: ["Category.categoryId", "subcategories.subcategoryId"],
      order: [["name", "ASC"]],
    });

    return categoryAndSub;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = findAllCategoryAndSub;
