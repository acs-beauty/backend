// const PAGE_SIZE = require('../constants/product')
const { PAGE_SIZE } = require('../constants')
const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { Feedback } = require('../models')
const { Op } = require('sequelize')

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

  patch = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const { password, isAdmin, createdAt, updatedAt } = req.body

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    if (password || isAdmin || createdAt || updatedAt) {
      return next(ApiError.badRequest('Невозможно выполнить запрос'))
    }

    let feedback = await Feedback.update(req.body, {
      where: {
        id,
      },
    })
    feedback = await Feedback.findOne({ where: { id }, raw: true, attributes: { exclude: ['password', 'isAdmin'] } })
    if (!feedback) {
      return next(ApiError.notFound(`Пользователь с id ${id} не найден`))
    }
    return res.json(feedback)
  })

  getPaginated = asyncErrorHandler(async (req, res, next) => {
    const { pageSize, page, lookup } = req.query

    if (!page) {
      return next(ApiError.badRequest('Не передан номер страницы пагинации'))
    }

    let where = {
      [Op.or]: [
        {
          firstName: {
            [Op.like]: `%${lookup}%`,
          },
        },
        {
          lastName: {
            [Op.like]: `%${lookup}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${lookup}%`,
          },
        },
        {
          id:
            typeof lookup === 'number'
              ? {
                  [Op.eq]: lookup,
                }
              : { [Op.lt]: 0 },
        },
        {
          phone: {
            [Op.like]: `%${lookup}%`,
          },
        },
      ],
    }

    // if (typeof lookup === 'number') {
    //   where = { ...where, [Op.or]: [...where[Op.or], { id: { [Op.eq]: lookup } }] }
    // }

    let users = await Feedback.findAndCountAll({
      where,
      attributes: { exclude: ['password', 'isAdmin'] },
      limit: pageSize || PAGE_SIZE,
      offset: (page - 1) * (pageSize || PAGE_SIZE),
      raw: true,
      // nest: true,
    })

    return res.json(users)
  })
}

module.exports = new FeedbackController()
