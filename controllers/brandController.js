const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { Brand } = require('../models')

class brandController {
  post = asyncErrorHandler(async (req, res, next) => {
    const { name } = req.body
    if (!name) {
      return next(ApiError.badRequest('Не передано поле name'))
    }

    const brand = await Brand.create({ name })
    return res.json(brand)
  })

  // get = asyncErrorHandler(async (req, res, next) => {
  //   const { id } = req.params

  //   if (!id) {
  //     return next(ApiError.badRequest('Не передан параметр id'))
  //   }

  //   const brand = await Brand.findByPk(id)
  //   if (!brand) {
  //     return next(ApiError.notFound(`Брэнд с id ${id} не найден`))
  //   }
  //   return res.json(brand)
  // })

  getAll = asyncErrorHandler(async (req, res, next) => {
    const brands = await Brand.findAll()
    return res.json(brands)
  })

  delete = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const brand = await Brand.findByPk(id)
    if (!brand) {
      return next(ApiError.notFound(`брэнд с id ${id} не найден`))
    }
    await brand.destroy()

    // await Category.destroy({
    //   where: {
    //     id,
    //   },
    // })

    return res.status(204).json()
    // return res.json('Категория была успешно удалена')
  })
}

module.exports = new brandController()
