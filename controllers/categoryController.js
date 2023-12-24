const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { User } = require('../models')
const { Category, Subcategory } = require('../models')
const findUser = require('../queries/findUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const slugify = require('slugify')

class CategoryController {
  post = asyncErrorHandler(async (req, res, next) => {
    const { name } = req.body
    if (!name) {
      return next(ApiError.badRequest('Не передано поле name'))
    }
    // if (!slug) {
    //   return next(ApiError.badRequest('Не передано поле slug'))
    // }

    const category = await Category.create({ name, slug: slugify(name, { lower: true }) })
    return res.status(201).json(category)
  })

  getAll = asyncErrorHandler(async (req, res, next) => {
    // const { id } = req.params

    // if (!id) {
    //   return next(ApiError.badRequest('Не передан параметр id'))
    // }

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

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const category = await Category.update(req.body, {
      where: {
        id,
      },
    })
    if (!category || category[0] === 0) {
      return next(ApiError.notFound(`Категория с id ${id} не найдена`))
    }
    return res.json(category)
  })

  delete = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const category = await Category.findByPk(id)
    if (!category) {
      return next(ApiError.notFound(`категория с id ${id} не найдена`))
    }
    await category.destroy()

    // await Category.destroy({
    //   where: {
    //     id,
    //   },
    // })

    return res.status(204).json()
    // return res.json('Категория была успешно удалена')
  })
}

module.exports = new CategoryController()
