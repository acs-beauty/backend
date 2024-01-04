// const PAGE_SIZE = require('../constants/product')
const { PAGE_SIZE } = require('../constants')
const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { Feedback, User, Product } = require('../models')
const { Op, col } = require('sequelize')

class FeedbackController {
  post = asyncErrorHandler(async (req, res, next) => {
    const { ProductId, UserId } = req.body
    if (!ProductId) {
      return next(ApiError.badRequest('Не передано поле ProductId'))
    }
    if (!UserId) {
      return next(ApiError.badRequest('Не передано поле UserId'))
    }

    const feedback = await Feedback.create(req.body)
    return res.status(201).json(feedback)
  })

  delete = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const count = await Feedback.destroy({ where: { id } })
    if (!count) {
      return next(ApiError.notFound(`отзыв с id ${id} не найден`))
    }

    return res.status(204).json()
    // return res.json('Категория была успешно удалена')
  })

  get = asyncErrorHandler(async (req, res, next) => {
    const { productId } = req.params

    if (!productId) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const feedbacks = await Feedback.findAll({
      where: { ProductId: productId },
      attributes: {
        include: [
          [col('User.firstName'), 'firstName'],
          [col('User.lastName'), 'lastName'],
        ],
        exclude: ['ProductId', 'UserId'],
      },
      include: {
        model: User,
        attributes: [],
      },
      raw: true,
      // nest: true,
    })
    if (!feedbacks.length) {
      return next(ApiError.notFound(`на продукт с id ${productId} не были оставлены отзывы`))
    }
    return res.json(feedbacks)
  })

  getPaginated = asyncErrorHandler(async (req, res, next) => {
    const { pageSize, page, lookup, status } = req.query

    if (!page) {
      return next(ApiError.badRequest('Не передан номер страницы пагинации'))
    }

    let where = {}
    if (lookup) {
      where[Op.or] = [
        {
          review: {
            [Op.like]: `%${lookup}%`,
          },
        },
        {
          ['$Product.name$']: {
            [Op.like]: `%${lookup}%`,
          },
        },
        {
          ['$User.firstName$']: {
            [Op.like]: `%${lookup}%`,
          },
        },
        {
          ['$User.lastName$']: {
            [Op.like]: `%${lookup}%`,
          },
        },
      ]

      if (/^\d+$/.test(lookup)) {
        where[Op.or].push({ id: { [Op.eq]: lookup } })
      }
    }

    if (status) {
      where.status = status
    }

    let users = await Feedback.findAndCountAll({
      where,
      attributes: {
        include: [
          [col('User.firstName'), 'firstName'],
          [col('User.lastName'), 'lastName'],
          [col('Product.name'), 'productName'],
        ],
        exclude: ['createdAt', 'ProductId', 'UserId'],
      },
      // attributes: ['id', 'review', 'rating', 'status', [col('User.firstName'), 'firstName'], [col('User.lastName'), 'lastName']],

      // attributes: { exclude: ['password', 'isAdmin'] },
      limit: pageSize || PAGE_SIZE,
      offset: (page - 1) * (pageSize || PAGE_SIZE),
      raw: true,
      include: [
        {
          model: Product,
          attributes: [],
        },
        {
          model: User,
          attributes: [],
        },
      ],
      // nest: true,
    })

    // const count = await Feedback.count()

    return res.json(users)
  })
}

module.exports = new FeedbackController()
