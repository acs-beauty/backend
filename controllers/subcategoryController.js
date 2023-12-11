const ApiError = require('../errors/ApiError')
const { Subcategory } = require('../models')

class subcategoryController {
  async post(req, res, next) {
    const { name, CategoryId } = req.body
    try {
      if (!name) {
        return next(ApiError.badRequest('Не передано поле name'))
      }
      if (!CategoryId) {
        return next(ApiError.badRequest('Не передано поле CategoryId'))
      }

      const subcategory = await Subcategory.create({ name, CategoryId })
      return res.json(subcategory)
    } catch {
      return next(ApiError.badRequest(`Непредвиденная ошибка, возможно не существует родительской категории с id ${CategoryId}`))
    }
  }

  async get(req, res, next) {
    try {
      const { id } = req.params

      if (!id) {
        return next(ApiError.badRequest('Не передан параметр id'))
      }

      const subcategory = await Subcategory.findByPk(id)
      return res.json(subcategory)
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

      const subcategory = await Subcategory.findByPk(id)
      if (!subcategory) {
        return next(ApiError.notFound(`подкатегория с id ${id} не найдена`))
      }
      await subcategory.destroy()

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

module.exports = new subcategoryController()
