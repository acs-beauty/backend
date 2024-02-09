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
    const promises = []
    const length = req.files.length <= 10 ? req.files.length : 10
    for (let i = 0; i < length; i++) {
      const params = {
        Body: req.files[i].buffer,
        Bucket: 'acs-beauty-bucket',
        Key: `product/${unifyPath(req, i)}`,
      }
      promises.push(s3.upload(params).promise())
    }

    const results = await Promise.all(promises)

    const objects = []
    for (const result of results) {
      objects.push({ url: decodeURI(result.Location), productId: product.id })
    }

    const images = await Image.bulkCreate(objects)

    product = { ...product, images }

    return res.status(201).json(product)
  })

  patch = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const { imageIds } = req.body

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    let product = await Product.findByPk(id)
    if (!product) {
      return next(ApiError.notFound(`Товар с id ${id} не найден`))
    }

    let ids = imageIds.split(',')
    ids = ids.map(id => +id)

    let items = await Image.findAll({ where: { productId: id }, raw: true })
    const imagesForDeleting = items.filter(image => !ids.includes(image.id))
    const existImages = items.filter(image => ids.includes(image.id))

    for (const image of imagesForDeleting) {
      await Image.destroy({ where: { id: image.id } })
      const params = {
        Bucket: 'acs-beauty-bucket',
        Key: `product/${image.url.slice(image.url.lastIndexOf('/') + 1)}`,
      }
      s3.deleteObject(params).promise()
    }

    const { imageIds: excludedField, ...rest } = req.body

    await Product.update(rest, {
      where: {
        id,
      },
      returning: true,
    })

    if (!req.files.length) {
      product = await Product.findByPk(id, {
        include: {
          model: Image,
          as: 'images',
        },
      })
      return res.json(product)
    }

    const objects = []

    const length = req.files.length + ids.length > 10 ? 10 - ids.length : req.files.length
    for (let i = 0; i < length; i++) {
      const params = {
        Body: req.files[i].buffer,
        Bucket: 'acs-beauty-bucket',
        Key: `product/${unifyPath(req, i)}`,
      }
      const data = await s3.upload(params).promise()

      // const image = await Image.create({ url: decodeURI(data.Location), productId: id })
      // images.push(image.toJSON())
      objects.push({ url: decodeURI(data.Location), productId: id })
    }

    let images = await Image.bulkCreate(objects)
    images = images.map(image => image.toJSON())

    product = { ...product.toJSON(), images: [...existImages, ...images] }

    return res.json(product)
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

    return res.json(products)
  })

  delete = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const product = await Product.findByPk(id)
    if (!product) {
      return next(ApiError.notFound(`Товар с id ${id} не найден`))
    }

    const images = await Image.findAll({ where: { productId: id }, raw: true })

    await product.destroy()

    for (const image of images) {
      const params = {
        Bucket: 'acs-beauty-bucket',
        Key: `product/${image.url.slice(image.url.lastIndexOf('/') + 1)}`,
      }
      s3.deleteObject(params).promise()
    }

    return res.status(204).json()
  })
}

module.exports = new productController()
