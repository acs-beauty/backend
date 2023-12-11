'use strict'
const { Product } = require('../models')

const findAllProductIds = async () => {
  try {
    const allProductIds = await Product.findAll({
      attributes: ['id'],
      raw: true,
    })

    return allProductIds.map(product => product.id)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = findAllProductIds
