const ApiError = require('../errors/ApiError')
const { Brand } = require('../models')

class brandController {
  async post(req, res, next) {
    const { name } = req.body
    try {
      if (!name) {
        return next(ApiError.badRequest('Не передано поле name'))
      }

      const brand = await Brand.create({ name })
      return res.json(brand)
    } catch(err) {
      return next(ApiError.badRequest(err.message))
    }
  }

  async get(req, res, next) {
    try {
      const { id } = req.params

      if (!id) {
        return next(ApiError.badRequest('Не передан параметр id'))
      }

      const brand = await Brand.findByPk(id)
      return res.json(brand)
    } catch {
      return next(ApiError.badRequest('Возможно в запросе не передан параметр id или он имеет неправильный формат'))
    }
  }

  async getAll(req, res, next) {
    try {
      const brands = await Brand.findAll()
      return res.json(brands)
    } catch (err) {
      return next(ApiError.badRequest(err.message))
    }
  }

  async delete(req, res, next) {
    try {
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
    } catch {
      return next(ApiError.badRequest('Возможно в запросе не передан параметр id или он имеет неправильный формат'))
    }
  }
}

module.exports = new brandController()
