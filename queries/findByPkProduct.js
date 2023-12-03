'use strict'
const Sequelize = require('sequelize')

const {
  // Sequelize,
  Product,
  Brand,
  Category,
  Subcategory,
  Parameter,
  ProductImage,
} = require('../models')
const { Op, literal, col } = Sequelize
const { AVAILABLE, FEW, NOT_AVAILABLE, QUANTITY } = require('../constants')

const findByPkProduct = async productId => {
  try {
    const product = await Product.findByPk(productId, {
      attributes: [
        'productId',
        'titleName',
        'description',
        'composition',
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
      ],
      include: [
        {
          model: Brand,
          as: 'brand',
          attributes: ['name', 'country', 'linkKey'],
        },
        {
          model: Parameter,
          as: 'parameter',
          attributes: {
            exclude: ['parameterId', 'productId'],
          },
        },
        {
          model: ProductImage,
          as: 'images',
          attributes: ['imageName'],
        },
      ],
    })
    if (product) {
      return product.get({ plain: true })
    } else {
      throw 'This product does not exist'
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = findByPkProduct
