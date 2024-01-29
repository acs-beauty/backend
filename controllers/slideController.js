const { PAGE_SIZE } = require('../constants')
const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { Slide } = require('../models')
const unifyPath = require('../utils/unifyPath')
const s3 = require('../utils/s3')
const deleteAndUploadNew = require('../utils/deleteAndUploadNew')

class brandController {
  post = asyncErrorHandler(async (req, res, next) => {
    let slide = await Slide.create(req.body)

    let params = {
      Body: req.files[0].buffer,
      Bucket: 'acs-beauty-bucket',
      Key: `slide/${unifyPath(req, 0)}`,
    }
    let data = await s3.upload(params).promise()
    slide.desktopBanner = decodeURI(data.Location)

    params = {
      Body: req.files[1].buffer,
      Bucket: 'acs-beauty-bucket',
      Key: `slide/${unifyPath(req, 1)}`,
    }
    data = await s3.upload(params).promise()
    slide.mobileBanner = decodeURI(data.Location)

    slide.save()
    // const slide = await Slide.create({ name, description, desktopBanner: decodeURI(data.Location) })
    return res.status(201).json(slide)
  })

  patch = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const slide = await Slide.findByPk(id)
    if (!slide) {
      return next(ApiError.notFound(`Слайд с id ${id} не найден`))
    }

    const [_, [slide1]] = await Slide.update(req.body, {
      where: {
        id,
      },
      returning: true,
    })

    if (!req.files.length) {
      return res.json(slide1)
    }

    await deleteAndUploadNew(slide1, 'desktopBanner', req, 0)
    await deleteAndUploadNew(slide1, 'mobileBanner', req, 1)

    slide1.save()

    return res.json(slide1)
  })

  getPaginated = asyncErrorHandler(async (req, res, next) => {
    const { page, pageSize } = req.query

    let slides = await Slide.findAndCountAll({
      // where,
      limit: pageSize || PAGE_SIZE,
      order: [['priority', 'ASC']],
      offset: (page - 1) * (pageSize || PAGE_SIZE),
      raw: true,
      // nest: true,
    })

    return res.json(slides)
  })

  delete = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const slide = await Slide.findByPk(id)
    if (!slide) {
      return next(ApiError.notFound(`Слайд с id ${id} не найден`))
    }

    const count = await slide.destroy()
    // if (!count) {
    //   return next(ApiError.notFound(`брэнд с id ${id} не найден`))
    // }
    const desktopBanner = decodeURI(slide.dataValues.desktopBanner)
    const params = {
      Bucket: 'acs-beauty-bucket',
      Key: `slide/${desktopBanner.slice(desktopBanner.lastIndexOf('/') + 1)}`,
    }
    s3.deleteObject(params).promise()

    const mobileBanner = decodeURI(slide.dataValues.mobileBanner)
    params.Key = `slide/${mobileBanner.slice(mobileBanner.lastIndexOf('/') + 1)}`
    s3.deleteObject(params).promise()

    return res.status(204).json()
    // return res.json('Категория была успешно удалена')
  })
}

module.exports = new brandController()
