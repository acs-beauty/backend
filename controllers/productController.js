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
    const { name, SubcategoryId } = req.body
    if (!name) {
      return next(ApiError.badRequest('Не передано поле name'))
    }
    if (!SubcategoryId) {
      return next(ApiError.badRequest('Не передано поле SubcategoryId'))
    }

    const product = await Product.create(req.body)
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

  getPaginated = asyncErrorHandler(async (req, res, next) => {
    const { category, discount, availability, page, lookup, pageSize } = req.query

    // if (!id) {
    //   return next(ApiError.badRequest('Не передан параметр id'))
    // }
    // const where = {}
    // if (discount) {
    //   where.discount = { [Op.gt]: 0 }
    // }
    // if (availability) {
    //   where.count = { [Op.gt]: 0 }
    // }
    // if (category) {
    //   where['$Subcategory.CategoryId$'] = category
    // }

    let where = {}
    if (discount || availability) {
      where = {
        [Op.and]: [
          // {
          //   ['$Subcategory.CategoryId$']: category
          //     ? {
          //         [Op.eq]: category,
          //       }
          //     : { [Op.eq]: this['$Subcategory.CategoryId$'] },
          // },
          {
            discount: discount
              ? {
                  [Op.gt]: 0,
                }
              : { [Op.eq]: this.discount },
          },
          {
            count: availability
              ? {
                  [Op.gt]: 0,
                }
              : { [Op.eq]: this.count },
          },
        ],
      }
    }

    // if (category) {
    //   where = {
    //     ...where,
    //     [Op.and]: [
    //       ...where[Op.and],
    //       {
    //         ['$Subcategory.CategoryId$']: {
    //           [Op.eq]: category,
    //         },
    //       },
    //     ],
    //   }
    // }

    // if (availability) {
    //   where = {
    //     // [Op.and]: [
    //     // {
    //     //   ['$Subcategory.CategoryId$']: category
    //     //     ? {
    //     //         [Op.eq]: category,
    //     //       }
    //     //     : { [Op.eq]: undefined },
    //     // },
    //     // {
    //     //   discount: discount
    //     //     ? {
    //     //         [Op.gt]: 0,
    //     //       }
    //     //     : { [Op.eq]: undefined },
    //     // },
    //     // {
    //     count: { [Op.gt]: 0 },
    //     //   },
    //     // ],
    //   }
    //   // where = { ...where, [Op.and]: [...where[Op.and], { count: { [Op.gt]: 0 } }] }
    // }

    if (lookup) {
      where = {
        ...where,
        [Op.and]: [
          ...where[Op.and],
          {
            [Op.or]: [
              {
                id: /^\d+$/.test(lookup)
                  ? {
                      [Op.eq]: Number(lookup),
                    }
                  : { [Op.lt]: 0 },
              },
              {
                name: {
                  [Op.like]: `%${lookup}%`,
                },
              },
            ],
          },
        ],
      }
    }

    // const where = {
    //   [Op.or]: [
    //     {
    //       id: /^\d+$/.test(lookup)
    //         ? {
    //             [Op.eq]: Number(lookup),
    //           }
    //         : { [Op.lt]: 0 },
    //     },
    //     {
    //       name: {
    //         [Op.like]: `%${lookup}%`,
    //       },
    //     },
    //   ],
    // }

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
