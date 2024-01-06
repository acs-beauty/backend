const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { Brand } = require('../models')
const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'eu-north-1',
  signatureVersion: 'v4',
})

class brandController {
  post = asyncErrorHandler(async (req, res, next) => {
    const { name, description } = req.body
    console.log(req.body)
    console.log(req.files)
    // const { name } = req.body
    // if (!name) {
    //   return next(ApiError.badRequest('Не передано поле name'))
    // }

    const params = {
      Body: req.files[0].buffer,
      Bucket: 'acs-beauty-bucket',
      Key: req.files[0].originalname,
    }
    s3.upload(params, async (err, data) => {
      console.log('err = ', err)
      console.log('data = ', data)
      console.log('data.Location = ', data.Location)
      const brand = await Brand.create({ name, description, logo: data.Location })
      return res.status(201).json(brand)
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

  getAll = asyncErrorHandler(async (req, res, next) => {
    const brands = await Brand.findAll()
    return res.json(brands)
  })

  delete = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const count = await Feedback.destroy({ where: { id } })
    if (!count) {
      return next(ApiError.notFound(`брэнд с id ${id} не найден`))
    }

    return res.status(204).json()
    // return res.json('Категория была успешно удалена')
  })
}

module.exports = new brandController()
