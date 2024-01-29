const { PAGE_SIZE } = require('../constants')
const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { News } = require('../models')
const { Op } = require('sequelize')
const unifyPath = require('../utils/unifyPath')
const s3 = require('../utils/s3')

class newsController {
  post = asyncErrorHandler(async (req, res, next) => {
    let item = await News.create(req.body)

    const params = {
      Body: req.files[0].buffer,
      Bucket: 'acs-beauty-bucket',
      Key: `news/${unifyPath(req)}`,
    }
    const data = await s3.upload(params).promise()

    item.banner = decodeURI(data.Location)
    item.save()
    // const item = await News.create({ name, description, banner: decodeURI(data.Location) })
    return res.status(201).json(item)
  })

  patch = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const item = await News.findByPk(id)
    if (!item) {
      return next(ApiError.notFound(`Новость с id ${id} не найдена`))
    }

    const [_, [item1]] = await News.update(req.body, {
      where: {
        id,
      },
      returning: true,
    })

    if (!req.files.length) {
      return res.json(item1)
    }

    const banner = decodeURI(item1.dataValues.banner)
    // console.log('banner = ', banner)

    let params = {
      Bucket: 'acs-beauty-bucket',
      Key: `news/${banner.slice(banner.lastIndexOf('/') + 1)}`,
    }
    // console.log('deleted item = ', `item/${banner.slice(banner.lastIndexOf('/') + 1)}`)
    s3.deleteObject(params).promise()

    params = {
      Body: req.files[0].buffer,
      Bucket: 'acs-beauty-bucket',
      Key: `news/${unifyPath(req)}`,
    }
    const data = await s3.upload(params).promise()

    item1.banner = decodeURI(data.Location)
    item1.save()

    return res.json(item1)
  })

  getPaginated = asyncErrorHandler(async (req, res, next) => {
    const { page, pageSize, lookup } = req.query

    let where = {}

    // if (/^\d+$/.test(lookup)) {
    if (lookup) {
      where.title = {
        [Op.iLike]: `%${lookup}%`,
      }
    }

    let news = await News.findAndCountAll({
      where,
      limit: pageSize || PAGE_SIZE,
      offset: (page - 1) * (pageSize || PAGE_SIZE),
      raw: true,
      // nest: true,
    })

    return res.json(news)
  })

  delete = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const item = await News.findByPk(id)
    if (!item) {
      return next(ApiError.notFound(`Новость с id ${id} не найдена`))
    }

    await item.destroy()
    // const count = await item.destroy()
    // if (!count) {
    //   return next(ApiError.notFound(`брэнд с id ${id} не найден`))
    // }
    const banner = decodeURI(item.dataValues.banner)

    const params = {
      Bucket: 'acs-beauty-bucket',
      Key: `news/${banner.slice(banner.lastIndexOf('/') + 1)}`,
    }
    s3.deleteObject(params).promise()

    return res.status(204).json()
    // return res.json('Категория была успешно удалена')
  })
}

module.exports = new newsController()
