'use strict'
const { Subcategory } = require('../models')
const BadRequestError = require('../errors/BadRequestError')

const findByPkSubcategory = async subcategoryId => {
  try {
    const subcategory = await Subcategory.findOne({
      where: {
        subcategoryId,
      },
      attributes: ['categoryId', 'subcategoryId', 'name', 'linkKey', 'imageBannerName'],
    })

    if (subcategory) {
      return subcategory.get({ plain: true })
    } else {
      return new BadRequestError('такої підкатегорії немає')
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = findByPkSubcategory
