'use strict'
const ApiError = require('../errors/ApiError')
// const findAllPreviewProducts = require('../queries/findAllPreviewProducts')
// const findByPkProduct = require('../queries/findByPkProduct')
// const findAllSearchProduct = require('../queries/findAllSearchProduct')
// const findAllProductIds = require('../queries/findAllProductIds')
// const findAllParameterNames = require('../queries/findAllParameterNames')
const { Product } = require('../models')

class productController {
  async post(req, res, next) {
    const { name, description, price, discount, brand, novelty, hit, SubcategoryId } = req.body
    try {
      if (!name) {
        return next(ApiError.badRequest('Не передано поле name'))
      }
      if (!SubcategoryId) {
        return next(ApiError.badRequest('Не передано поле SubcategoryId'))
      }

      const product = await Product.create({ name, description, price, discount, brand, novelty, hit, SubcategoryId })
      return res.json(product)
    } catch {
      return next(
        ApiError.badRequest(`Непредвиденная ошибка, возможно не существует подкатегории с id ${SubcategoryId}`)
      )
    }
  }

  async get(req, res, next) {
    try {
      const { id } = req.params

      if (!id) {
        return next(ApiError.badRequest('Не передан параметр id'))
      }

      const product = await Product.findByPk(id)
      return res.json(product)
    } catch {
      return next(ApiError.badRequest('Возможно не передан параметр id или он имеет неправильный формат'))
    }
  }

  async delete(req, res, next) {
    try {
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
    } catch {
      return next(ApiError.badRequest('Возможно не передан параметр id или он имеет неправильный формат'))
    }
  }
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
