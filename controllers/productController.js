'use strict'
const { Op } = require('sequelize')
const PAGE_SIZE = require('../constants/product')
const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
// const findAllPreviewProducts = require('../queries/findAllPreviewProducts')
// const findByPkProduct = require('../queries/findByPkProduct')
// const findAllSearchProduct = require('../queries/findAllSearchProduct')
// const findAllProductIds = require('../queries/findAllProductIds')
// const findAllParameterNames = require('../queries/findAllParameterNames')
const { Product, Subcategory } = require('../models')

class productController {
  post = asyncErrorHandler(async (req, res, next) => {
    const { name, description, price, discount, BrandId, novelty, hit, SubcategoryId } = req.body
    if (!name) {
      return next(ApiError.badRequest('Не передано поле name'))
    }
    if (!SubcategoryId) {
      return next(ApiError.badRequest('Не передано поле SubcategoryId'))
    }

    const product = await Product.create({ name, description, price, discount, BrandId, novelty, hit, SubcategoryId })
    return res.status(201).json(product)
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

  getAll = asyncErrorHandler(async (req, res, next) => {
    const { category, discount, availability, page } = req.query

    // if (!id) {
    //   return next(ApiError.badRequest('Не передан параметр id'))
    // }
    const filters = {}
    if (discount) {
      filters.discount = { [Op.gt]: 0 }
    }
    if (availability) {
      filters.count = { [Op.gt]: 0 }
    }
    if (category) {
      filters['$Subcategory.CategoryId$'] = category
    }

    const products = await Product.findAll({
      // where: { count: { [Op.gt]: availability ? 0 : true}, ...filters },
      where: filters,
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
      // attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'password', 'refreshToken'],
      include: {
        model: Subcategory,
        // as: 'subcategory',
        // attributes: ["role"],
      },
    })
    // if (!product) {
    //   return next(ApiError.notFound(`Продукт с id ${id} не найден`))
    // }
    return res.json(products)
  })

  delete = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const product = await Product.findByPk(id)
    if (!product) {
      return next(ApiError.notFound(`продукт с id ${id} не найден`))
    }
    await product.destroy()

    // await Category.destroy({
    //   where: {
    //     id,
    //   },
    // })

    return res.status(204).json()
    // return res.json('Категория была успешно удалена')
  })
}

module.exports = new productController()

// module.exports.getPreviewProducts = async (req, res, next) => {
//   const { whereColumn, minPrice, maxPrice, limit, offset, sorting } = req.queryData

//   try {
//     const [totalProducts, products] = await findAllPreviewProducts({
//       ...whereColumn,
//       minPrice,
//       maxPrice,
//       limit,
//       offset,
//       sorting,
//     })

//     res.send({ totalProducts, products })
//   } catch (error) {
//     next(error)
//   }
// }

// module.exports.getProductId = async (req, res, next) => {
//   try {
//     const product = await findByPkProduct(req.params.id)
//     product.images = product.images.map(el => el.imageName)

//     const allParameterName = await findAllParameterNames()

//     const rebuildParameters = allParameterName
//       .map(item => {
//         const value = product.parameter[item.nameKey]
//         return value ? { title: item.value || '', value: value || '' } : null
//       })
//       .filter(item => item)

//     res.send({ ...product, parameter: rebuildParameters })
//   } catch (error) {
//     next(error)
//   }
// }

// module.exports.searchProducts = async (req, res, next) => {
//   const limit = req.query.limit || 8
//   const offset = req.query.offset || 0
//   try {
//     const searchWords = req.query.searchWords.split(',') || []

//     const [totalProducts, products] = await findAllSearchProduct(searchWords, limit, offset)

//     res.send({ totalProducts, products })
//   } catch (error) {
//     next(error)
//   }
// }

// module.exports.getAllProductIds = async (req, res, next) => {
//   try {
//     const allProductIds = await findAllProductIds()

//     res.send(allProductIds)
//   } catch (error) {
//     next(error)
//   }
// }
