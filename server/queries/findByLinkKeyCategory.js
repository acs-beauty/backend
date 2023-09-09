"use strict";
const { Sequelize, Category, Subcategory } = require("../db_schema/models");
const { literal } = Sequelize;

const findByLinkKeyCategory = async (linkKey) => {
  try {
    const category = await Category.findOne({
      where: {
        linkKey,
      },
      attributes: [
        "categoryId",
        "name",
        "linkKey",
        "imageBannerName",
        [
          literal(`(
          SELECT MIN(LEAST("Products"."price", "Products"."discountPrice"))
          FROM "Products"
          WHERE "Products"."subcategoryId" IN (
            SELECT "subcategoryId" FROM "Subcategories" WHERE "categoryId" = "Category"."categoryId"
          )
        )`),
          "minPrice",
        ],
        [
          literal(`(
          SELECT MAX(GREATEST("Products"."price", "Products"."discountPrice"))
          FROM "Products"
          WHERE "Products"."subcategoryId" IN (
            SELECT "subcategoryId" FROM "Subcategories" WHERE "categoryId" = "Category"."categoryId"
          )
        )`),
          "maxPrice",
        ],
      ],
      include: [
        {
          model: Subcategory,
          as: "subcategories",
          attributes: ["subcategoryId", "name", "linkKey"],
        },
      ],
    });

    return category.get({ plain: true });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = findByLinkKeyCategory;
