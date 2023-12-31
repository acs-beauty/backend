const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { Subcategory } = require('../models')

class subcategoryController {
  post = asyncErrorHandler(async (req, res, next) => {
    const { name, CategoryId } = req.body
    if (!name) {
      return next(ApiError.badRequest('Не передано поле name'))
    }
    if (!CategoryId) {
      return next(ApiError.badRequest('Не передано поле CategoryId'))
    }

    const subcategory = await Subcategory.create({ name, CategoryId })
    return res.status(201).json(subcategory)
  })

  patch = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const [_, [subcategory]] = await Subcategory.update(req.body, {
      where: {
        id,
      },
      returning: true,
    })
    if (!subcategory || subcategory[0] === 0) {
      return next(ApiError.notFound(`подкатегория с id ${id} не найдена`))
    }
    return res.json(subcategory)
  })

  // async get(req, res, next) {
  //   try {
  //     const { id } = req.params

  //     if (!id) {
  //       return next(ApiError.badRequest('Не передан параметр id'))
  //     }

  //     const subcategory = await Subcategory.findByPk(id)
  //     return res.json(subcategory)
  //   } catch {
  //     return next(ApiError.badRequest('Возможно в запросе не передан параметр id или он имеет неправильный формат'))
  //   }
  // }

  delete = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const count = await Subcategory.destroy({ where: { id } })

    if (!count) {
      return next(ApiError.notFound(`подкатегория с id ${id} не найдена`))
    }

    return res.status(204).json()
    // return res.json('Категория была успешно удалена')
  })
}

module.exports = new subcategoryController()
