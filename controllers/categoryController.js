const ApiError = require('../errors/ApiError')
const { User } = require('../models')
const { Category, Subcategory } = require('../models')
const findUser = require('../queries/findUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const slugify = require('slugify')

class CategoryController {
  async post(req, res, next) {
    try {
      const { name } = req.body
      if (!name) {
        return next(ApiError.badRequest('Не передано поле name'))
      }
      // if (!slug) {
      //   return next(ApiError.badRequest('Не передано поле slug'))
      // }

      const category = await Category.create({ name, slug: slugify(name, { lower: true }) })
      return res.json(category)
    } catch {
      return next(
        ApiError.badRequest(
          'Непредвиденная ошибка, возможно вы пытаетесь передать категорию с полем slug, которое уже есть в базе данных'
        )
      )
    }
  }

  async getAll(req, res, next) {
    try {
      // const { id } = req.params

      // if (!id) {
      //   return next(ApiError.badRequest('Не передан параметр id'))
      // }

      console.log('111111111111111111')
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
    } catch (error) {
      console.log(error)
      return next(ApiError.badRequest('Непредвиденная ошибка'))
    }
  }

  async get(req, res, next) {
    try {
      const { id } = req.params

      if (!id) {
        return next(ApiError.badRequest('Не передан параметр id'))
      }

      const category = await Category.findByPk(id)
      return res.json(category)
    } catch {
      return next(ApiError.badRequest('Возможно в запросе не передан параметр id или он имеет неправильный формат'))
    }
  }

  async patch(req, res, next) {
    try {
      const { id } = req.params

      if (!id) {
        return next(ApiError.badRequest('Не передан параметр id'))
      }

      const category = await Category.update(req.body, {
        where: {
          id,
        },
      })
      return res.json(category)
    } catch {
      return next(ApiError.badRequest('Возможно в запросе не передан параметр id или он имеет неправильный формат'))
    }
  }

  async delete(req, res, next) {
    try {
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
    } catch {
      return next(ApiError.badRequest('Возможно в запросе не передан параметр id или он имеет неправильный формат'))
    }
  }
}

module.exports = new CategoryController()
