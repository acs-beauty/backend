'use strict'
const Sequelize = require('sequelize')

const { whereHelper, validSortFields } = require('../utils/whereHelperPreviewProducts')
const sortingHelper = require('../utils/sortingHelper')
// const { Sequelize } = require("../models");
const { Op } = Sequelize
const { MAX_PRICE } = require('../constants')

module.exports.previewProducts = (req, res, next) => {
  const minPrice = req.query.minPrice || 0
  const maxPrice = req.query.maxPrice || MAX_PRICE
  const limit = req.query.limit || 8
  const offset = req.query.offset || 0
  const sortBy = req.query.sortBy
  const direction = req.query.direction
  const whereColumn = whereHelper(req.query)

  if (req.query.discount === 'true') {
    Object.assign(whereColumn.whereProducts, {
      discountPrice: {
        [Op.not]: null,
      },
    })
  }

  if (req.query.productIds) {
    Object.assign(whereColumn.whereProducts, {
      id: {
        [Op.in]: req.query.productIds.split(','),
      },
    })
  }

  const sorting = sortingHelper(sortBy, direction, validSortFields)

  req.queryData = {
    whereColumn,
    minPrice,
    maxPrice,
    limit,
    offset,
    sorting,
  }

  next()
}
