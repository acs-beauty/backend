const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { Category, Subcategory } = require('../models')
const slugify = require('slugify')
const unifyPath = require('../utils/unifyPath')
const s3 = require('../utils/s3')

class CategoryController {
  post = asyncErrorHandler(async (req, res, next) => {
    const { name } = req.body
    if (!name) {
      return next(ApiError.badRequest('Не передано поле name'))
    }

    let category = await Category.create({ name, slug: slugify(name, { lower: true }) })

    const params = {
      Body: req.files[0].buffer,
      Bucket: 'acs-beauty-bucket',
      Key: `category/${unifyPath(req)}`,
    }
    const data = await s3.upload(params).promise()

    category.image = decodeURI(data.Location)
    category.save()

    return res.status(201).json(category)
  })

  getAll = asyncErrorHandler(async (req, res, next) => {
    const categories = await Category.findAll({
      include: [
        {
          model: Subcategory,
          as: 'subcategories',
          attributes: ['id', 'name'],
        },
      ],
    })
    return res.json(categories)
  })

  // get = asyncErrorHandler(async (req, res, next) => {
  //   const { id } = req.params

  //   if (!id) {
  //     return next(ApiError.badRequest('Не передан параметр id'))
  //   }

  //   const category = await Category.findByPk(id)
  //   return res.json(category)
  // })

  patch = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const { name } = req.body

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const category = await Category.findByPk(id)
    if (!category) {
      return next(ApiError.notFound(`Категория с id ${id} не найдена`))
    }

    const [_, [category1]] = await Category.update(
      { name, slug: slugify(name, { lower: true }) },
      {
        where: {
          id,
        },
        returning: true,
      }
    )

    if (!req.files.length) {
      return res.json(category1)
    }

    const image = decodeURI(category1.dataValues.image)

    let params = {
      Bucket: 'acs-beauty-bucket',
      Key: `category/${image.slice(image.lastIndexOf('/') + 1)}`,
    }
    s3.deleteObject(params).promise()

    params = {
      Body: req.files[0].buffer,
      Bucket: 'acs-beauty-bucket',
      Key: `category/${unifyPath(req)}`,
    }
    const data = await s3.upload(params).promise()

    category1.image = decodeURI(data.Location)
    category1.save()

    return res.json(category1)
  })

  delete = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const category = await Category.findByPk(id)
    if (!category) {
      return next(ApiError.notFound(`Категория с id ${id} не найдена`))
    }

    const count = await category.destroy()
    // if (!count) {
    //   return next(ApiError.notFound(`брэнд с id ${id} не найден`))
    // }
    const image = decodeURI(category.dataValues.image)

    const params = {
      Bucket: 'acs-beauty-bucket',
      Key: `category/${image.slice(image.lastIndexOf('/') + 1)}`,
    }
    s3.deleteObject(params).promise()

    return res.status(204).json()
  })
}

module.exports = new CategoryController()
