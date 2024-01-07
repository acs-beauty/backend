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

    let brand = await Brand.create({ name, description })

    const params = {
      Body: req.files[0].buffer,
      Bucket: 'acs-beauty-bucket',
      Key: `brand/${unifyPath(req)}`,
    }
    const data = await s3.upload(params).promise()

    brand.logo = decodeURI(data.Location)
    brand.save()
    // const brand = await Brand.create({ name, description, logo: decodeURI(data.Location) })
    return res.status(201).json(brand)
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

    const [_, [brand1]] = await Brand.update(req.body, {
      where: {
        id,
      },
      returning: true,
    })

    if (!req.files.length) {
      return res.json(brand1)
    }

    const logo = decodeURI(brand1.dataValues.logo)
    // console.log('logo = ', logo)

    let params = {
      Bucket: 'acs-beauty-bucket',
      Key: `brand/${logo.slice(logo.lastIndexOf('/') + 1)}`,
    }
    // console.log('deleted brand = ', `brand/${logo.slice(logo.lastIndexOf('/') + 1)}`)
    s3.deleteObject(params).promise()

    params = {
      Body: req.files[0].buffer,
      Bucket: 'acs-beauty-bucket',
      Key: `brand/${unifyPath(req)}`,
    }
    const data = await s3.upload(params).promise()

    brand1.logo = decodeURI(data.Location)
    brand1.save()

    return res.json(brand1)
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
    // if (!count) {
    //   return next(ApiError.notFound(`брэнд с id ${id} не найден`))
    // }
    const logo = decodeURI(brand.dataValues.logo)

    const params = {
      Bucket: 'acs-beauty-bucket',
      Key: `brand/${logo.slice(logo.lastIndexOf('/') + 1)}`,
    }
    s3.deleteObject(params).promise()

    return res.status(204).json()
    // return res.json('Категория была успешно удалена')
  })
}

module.exports = new brandController()
