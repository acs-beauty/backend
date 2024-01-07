const { PAGE_SIZE } = require('../constants')
const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { Brand } = require('../models')
const { Op } = require('sequelize')
const unifyPath = require('../utils/unifyPath')
const s3 = require('../utils/s3')

class brandController {
  post = asyncErrorHandler(async (req, res, next) => {
    const { name, description } = req.body

    const params = {
      Body: req.files[0].buffer,
      Bucket: 'acs-beauty-bucket',
      Key: unifyPath(req),
    }
    s3.upload(params, async (err, data) => {
      const brand = await Brand.create({ name, description, logo: decodeURI(data.Location) })
      return res.status(201).json(brand)
    })
  })

  patch = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const brand = await Brand.findByPk(id)
    if (!brand) {
      return next(ApiError.notFound(`Брэнд с id ${id} не найден`))
    }
    const logo = decodeURI(brand.dataValues.logo)

    let params = {
      Bucket: 'acs-beauty-bucket',
      Key: logo.slice(logo.lastIndexOf('/') + 1),
    }
    s3.deleteObject(params, (err, data) => {})

    params = {
      Body: req.files[0].buffer,
      Bucket: 'acs-beauty-bucket',
      Key: unifyPath(req),
    }
    s3.upload(params, async (err, data) => {
      // obj = { ...req.body }
      // obj.logo = data.Location
      // obj.save()

      const [count, [brand]] = await Brand.update(
        { ...req.body, logo: decodeURI(data.Location) },
        {
          where: {
            id,
          },
          returning: true,
        }
      )

      if (!count) {
        return next(ApiError.notFound(`Брэнд с id ${id} не найден`))
      }
      return res.json(brand)
      // return res.status(201).json(brand)
    })
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

  getPaginated = asyncErrorHandler(async (req, res, next) => {
    const { page, pageSize, lookup } = req.query

    let where = {}

    // if (/^\d+$/.test(lookup)) {
    if (lookup) {
      where.name = {
        [Op.like]: `%${lookup}%`,
      }
    }

    let brands = await Brand.findAndCountAll({
      where,
      limit: pageSize || PAGE_SIZE,
      offset: (page - 1) * (pageSize || PAGE_SIZE),
      raw: true,
      // nest: true,
    })

    return res.json(brands)
  })

  delete = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const brand = await Brand.findByPk(id)
    if (!brand) {
      return next(ApiError.notFound(`Брэнд с id ${id} не найден`))
    }

    const count = await brand.destroy()
    if (!count) {
      return next(ApiError.notFound(`брэнд с id ${id} не найден`))
    }
    const logo = decodeURI(brand.dataValues.logo)

    const params = {
      Bucket: 'acs-beauty-bucket',
      Key: logo.slice(logo.lastIndexOf('/') + 1),
    }
    try {
      s3.deleteObject(params, (err, data) => {})
    } catch {
      return next(ApiError.notFound(`Ошибка при удалении логотипа брэнда`))
    }

    return res.status(204).json()
    // return res.json('Категория была успешно удалена')
  })
}

module.exports = new brandController()
