'use strict'
const Sequelize = require('sequelize')

const {
  // Sequelize,
  Product,
  Brand,
  Category,
  Subcategory,
} = require('../models')
const { Op, literal, col } = Sequelize
const { AVAILABLE, FEW, NOT_AVAILABLE, QUANTITY } = require('../constants')

const findAllPreviewProducts = async ({
  whereProducts,
  minPrice,
  maxPrice,
  limit,
  offset,
  sorting,
  whereBrand,
  whereSubcategory,
  whereCategory,
}) => {
  try {
    const { count, rows } = await Product.findAndCountAll({
      where: {
        ...whereProducts,
        [Op.or]: [
          {
            [Op.and]: [
              { discountPrice: { [Op.not]: null } },
              { discountPrice: { [Op.gte]: minPrice } },
              { discountPrice: { [Op.lte]: maxPrice } },
            ],
          },
          {
            [Op.and]: [{ discountPrice: null }, { price: { [Op.gte]: minPrice } }, { price: { [Op.lte]: maxPrice } }],
          },
        ],
      },
      limit: limit,
      offset: offset,
      order: [
        sorting[0] !== 'price'
          ? sorting
          : [literal(`CASE WHEN "discountPrice" IS NOT NULL THEN "discountPrice" ELSE "price" END`), sorting[1]],
        ['quantity', 'DESC'],
      ],
      attributes: [
        'productId',
        'titleName',
        'mainImageName',
        'price',
        'discountPrice',
        [
          literal(`CASE
            WHEN quantity = 0 THEN '${NOT_AVAILABLE}'
            WHEN quantity BETWEEN 1 AND ${QUANTITY} THEN '${FEW}'
            WHEN quantity > ${QUANTITY} THEN '${AVAILABLE}'
            END
          `),
          'quantityStatus',
        ],
        'novelty',
        'hit',
        [col('subcategory.linkKey'), 'subcategoryLinkKey'],
        [col('subcategory.category.linkKey'), 'categoryLinkKey'],
      ],
      include: [
        {
          model: Brand,
          as: 'brand',
          attributes: [],
          where: {
            ...whereBrand,
          },
        },
        {
          model: Subcategory,
          as: 'subcategory',
          attributes: [],
          where: {
            ...whereSubcategory,
          },
          include: [
            {
              model: Category,
              as: 'category',
              attributes: [],
              where: {
                ...whereCategory,
              },
            },
          ],
        },
      ],
    })

    return [count, rows]
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = findAllPreviewProducts
