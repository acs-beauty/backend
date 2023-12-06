'use strict'
const Sequelize = require('sequelize')

const {
  // Sequelize,
  Product,
  Category,
  Subcategory,
} = require('../models')
const { Op, literal, col } = Sequelize
const { AVAILABLE, FEW, NOT_AVAILABLE, QUANTITY } = require('../constants')

const findAllSearchProduct = async (searchWords, limit, offset) => {
  try {
    const { count, rows } = await Product.findAndCountAll({
      where: {
        [Op.or]: [
          ...searchWords.map(word => ({
            titleName: {
              [Op.iLike]: `%${word}%`,
            },
          })),
          ...searchWords.map(word => ({
            description: {
              [Op.iLike]: `%${word}%`,
            },
          })),
        ],
      },
      limit,
      offset,
      attributes: [
        'id',
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
          model: Subcategory,
          as: 'subcategory',
          attributes: [],
          include: [
            {
              model: Category,
              as: 'category',
              attributes: [],
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

module.exports = findAllSearchProduct
