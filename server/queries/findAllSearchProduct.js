"use strict";
const {
  Sequelize,
  Product,
  Category,
  Subcategory,
} = require("../db_schema/models");
const { Op, literal, col } = Sequelize;

const findAllSearchProduct = async (searchWords, limit, offset) => {
  try {
    const { count, rows } = await Product.findAndCountAll({
      where: {
        [Op.or]: [
          ...searchWords.map((word) => ({
            titleName: {
              [Op.iLike]: `%${word}%`,
            },
          })),
          ...searchWords.map((word) => ({
            description: {
              [Op.iLike]: `%${word}%`,
            },
          })),
        ],
      },
      limit,
      offset,
      attributes: [
        "productId",
        "titleName",
        "description",
        "mainImageName",
        "price",
        "discountPrice",
        [col("subcategory.linkKey"), "subcategoryLinkKey"],
        [col("subcategory.category.linkKey"), "categoryLinkKey"],
      ],
      include: [
        {
          model: Subcategory,
          as: "subcategory",
          attributes: [],
          include: [
            {
              model: Category,
              as: "category",
              attributes: [],
            },
          ],
        },
      ],
    });

    return [count, rows];
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = findAllSearchProduct;
