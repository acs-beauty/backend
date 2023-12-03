'use strict'
const { Product } = require('../models')

const findAllProductIds = async () => {
  try {
    const allProductIds = await Product.findAll({
      attributes: ['productId'],
      raw: true,
    })

    return allProductIds.map(product => product.productId)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = findAllProductIds
