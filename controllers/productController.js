'use strict'
const { Op } = require('sequelize')
const { sequelize } = require('../models')
const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
// const findAllPreviewProducts = require('../queries/findAllPreviewProducts')
// const findByPkProduct = require('../queries/findByPkProduct')
// const findAllSearchProduct = require('../queries/findAllSearchProduct')
// const findAllProductIds = require('../queries/findAllProductIds')
// const findAllParameterNames = require('../queries/findAllParameterNames')
const { Product, Subcategory, Category } = require('../models')
const { PAGE_SIZE } = require('../constants')

class productController {
  post = asyncErrorHandler(async (req, res, next) => {
    const { name, subcategoryId } = req.body
    if (!name) {
      return next(ApiError.badRequest('Не передано поле name'))
    }
    if (!subcategoryId) {
      return next(ApiError.badRequest('Не передано поле subcategoryId'))
    }

    const product = await Product.create(req.body)
    return res.status(201).json(product)
  })

  patch = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const [count, [product]] = await Product.update(req.body, {
      where: {
        id,
      },
      returning: true,
    })
    if (!count) {
      return next(ApiError.notFound(`Товар с id ${id} не найден`))
    }
    return res.json(product)
  })

  get = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const product = await Product.findByPk(id)
    if (!product) {
      return next(ApiError.notFound(`Продукт с id ${id} не найден`))
    }
    return res.json(product)
  })

  getPaginated = asyncErrorHandler(async (req, res, next) => {
    const { category, discount, availability, page, lookup, pageSize } = req.query

    let where = {}
    if (discount) {
      where.discount = { [Op.gt]: 0 }
    }
    if (availability) {
      where.count = { [Op.gt]: 0 }
    }

    if (category) {
      where['$Subcategory.categoryId$'] = {
        [Op.eq]: category,
      }
    }

    if (/^\d+$/.test(lookup)) {
      where[Op.or] = [
        {
          name: {
            [Op.like]: `%${lookup}%`,
          },
        },
        {
          id: {
            [Op.eq]: Number(lookup),
          },
        },
      ]
    } else if (lookup) {
      where.name = {
        [Op.like]: `%${lookup}%`,
      }
    }

    let products = await Product.findAndCountAll({
      where,
      limit: pageSize || PAGE_SIZE,
      offset: (page - 1) * (pageSize || PAGE_SIZE),
      raw: true,
      // nest: true,
      include: {
        model: Subcategory,
        // separate: true,
        attributes: [],

        // include: {
        //   model: Category,
        // },

        // through: {
        //   attributes: [],
        // },
        // as: 'subcategory',
        // attributes: ["role"],
      },
    })
    // const count = await Product.count()

    return res.json(products)
  })

  delete = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const count = await Product.destroy({ where: { id } })
    if (!count) {
      return next(ApiError.notFound(`продукт с id ${id} не найден`))
    }

    return res.status(204).json()
    // return res.json('Категория была успешно удалена')
  })
}

module.exports = new productController()
