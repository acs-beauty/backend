'use strict'
const { Op } = require('sequelize')
const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { Product, Subcategory, Image } = require('../models')
const { PAGE_SIZE } = require('../constants')
const unifyPath = require('../utils/unifyPath')
const s3 = require('../utils/s3')

class productController {
  post = asyncErrorHandler(async (req, res, next) => {
    const { name, subcategoryId } = req.body
    if (!name) {
      return next(ApiError.badRequest('Не передано поле name'))
    }
    if (!subcategoryId) {
      return next(ApiError.badRequest('Не передано поле subcategoryId'))
    }

    let product = await Product.create(req.body)

    product = product.toJSON()
    const images = []
    for (const file of req.files) {
      const params = {
        Body: file.buffer,
        Bucket: 'acs-beauty-bucket',
        Key: `product/${unifyPath(req)}`,
      }
      const data = await s3.upload(params).promise()

      const image = await Image.create({ url: data.Location, productId: product.id })
      images.push(image)
    }

    product = { ...product, images }

    return res.status(201).json(product)
  })

  patch = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    let item = await Product.findByPk(id)
    if (!item) {
      return next(ApiError.notFound(`Товар с id ${id} не найден`))
    }

    let result = null
    if (req.body.length) {
      let [_, [product]] = await Product.update(req.body, {
        where: {
          id,
        },
        returning: true,
      })

      if (!req.files.length) {
        return res.json(product)
      }
      result = product
    }

    item = result ? result.toJSON() : item.toJSON()
    const images = []
    for (const file of req.files) {
      const params = {
        Body: file.buffer,
        Bucket: 'acs-beauty-bucket',
        Key: `product/${unifyPath(req)}`,
      }
      const data = await s3.upload(params).promise()

      const image = await Image.create({ url: decodeURI(data.Location), productId: item.id })
      images.push(image)
    }

    item = { ...item, images }

    // if (!count) {
    //   return next(ApiError.notFound(`Товар с id ${id} не найден`))
    // }
    return res.json(item)
  })

  get = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const product = await Product.findByPk(id, {
      include: {
        model: Image,
        as: 'images',
      },
    })
    if (!product) {
      return next(ApiError.notFound(`Продукт с id ${id} не найден`))
    }
    return res.json(product)
  })

  getPaginated = asyncErrorHandler(async (req, res, next) => {
    const { category, discount, availability, page, lookup, pageSize } = req.query

    if (!page) {
      return next(ApiError.badRequest('Нужно передать страницу пагинации'))
    }

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
            [Op.iLike]: `%${lookup}%`,
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
        [Op.iLike]: `%${lookup}%`,
      }
    }

    let products = await Product.findAndCountAll({
      where,
      limit: pageSize || PAGE_SIZE,
      offset: (page - 1) * (pageSize || PAGE_SIZE),
      order: [['id', 'ASC']],
      // raw: true,
      // nest: true,
      include: [
        {
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
        {
          model: Image,
          as: 'images',
        },
      ],
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
