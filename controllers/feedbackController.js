// const PAGE_SIZE = require('../constants/product')
const { PAGE_SIZE } = require('../constants')
const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { Feedback, User, Product } = require('../models')
const { Op, col } = require('sequelize')

class FeedbackController {
  post = asyncErrorHandler(async (req, res, next) => {
    const { productId, userId } = req.body
    if (!productId) {
      return next(ApiError.badRequest('Не передано поле productId'))
    }
    if (!userId) {
      return next(ApiError.badRequest('Не передано поле userId'))
    }

    const feedback = await Feedback.create(req.body)
    return res.status(201).json(feedback)
  })

  patch = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const [count, [feedback]] = await Feedback.update(req.body, {
      where: {
        id,
      },
      // attributes: ['id', 'review', 'rating', 'status', 'createdAt'],
      returning: true,
    })
    if (!count) {
      return next(ApiError.notFound(`Отзыв с id ${id} не найден`))
    }
    return res.json(feedback)
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
      where: { productId: productId },
      attributes: {
        include: [
          [col('User.firstName'), 'firstName'],
          [col('User.lastName'), 'lastName'],
        ],
        exclude: ['productId', 'userId'],
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
    const { pageSize, page, rating, lookup, status } = req.query

    if (!page) {
      return next(ApiError.badRequest('Не передан номер страницы пагинации'))
    }

    let where = {}
    if (lookup) {
      where[Op.or] = [
        {
          review: {
            [Op.iLike]: `%${lookup}%`,
          },
        },
        {
          ['$Product.name$']: {
            [Op.iLike]: `%${lookup}%`,
          },
        },
        {
          ['$User.firstName$']: {
            [Op.iLike]: `%${lookup}%`,
          },
        },
        {
          ['$User.lastName$']: {
            [Op.iLike]: `%${lookup}%`,
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

    if (['positive', 'neutral', 'negative'].includes(rating)) {
      const ratingToCondition = {
        positive: { [Op.gt]: 2 },
        neutral: 2,
        negative: { [Op.lt]: 2 },
      }
      where.rating = ratingToCondition[rating]
    }

    let users = await Feedback.findAndCountAll({
      where,
      attributes: {
        include: [
          [col('User.firstName'), 'firstName'],
          [col('User.lastName'), 'lastName'],
          [col('Product.name'), 'productName'],
        ],
        exclude: ['productId', 'userId'],
      },
      // attributes: ['id', 'review', 'rating', 'status', [col('User.firstName'), 'firstName'], [col('User.lastName'), 'lastName']],

      // attributes: { exclude: ['password', 'isAdmin'] },
      order: [['id', 'ASC']],
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
