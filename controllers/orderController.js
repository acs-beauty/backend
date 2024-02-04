const { PAGE_SIZE } = require('../constants')
const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { Order, Product } = require('../models')
const { Op, col } = require('sequelize')

class subcategoryController {
  post = asyncErrorHandler(async (req, res, next) => {
    // const { name, categoryId } = req.body
    // if (!name) {
    //   return next(ApiError.badRequest('Не передано поле name'))
    // }
    // if (!categoryId) {
    //   return next(ApiError.badRequest('Не передано поле categoryId'))
    // }

    const order = await Order.create(req.body)
    return res.status(201).json(order)
  })

  patch = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const [count, [order]] = await Order.update(req.body, {
      where: {
        id,
      },
      returning: true,
    })
    if (!count) {
      return next(ApiError.notFound(`Заказ с id ${id} не найден`))
    }
    return res.json(order)
  })

  getPaginated = asyncErrorHandler(async (req, res, next) => {
    const { pageSize, page, lookup } = req.query

    if (!page) {
      return next(ApiError.badRequest('Не передан номер страницы пагинации'))
    }

    let where = {}
    if (lookup) {
      where[Op.or] = [
        {
          firstName: {
            [Op.iLike]: `%${lookup}%`,
          },
        },
        {
          lastName: {
            [Op.iLike]: `%${lookup}%`,
          },
        },
      ]
    }

    if (/^\d+$/.test(lookup)) {
      where = {
        [Op.or]: [
          ...where[Op.or],
          {
            tth: { [Op.eq]: lookup },
          },
        ],
      }
    }

    let result = await Order.findAndCountAll({
      where,
      limit: pageSize || PAGE_SIZE,
      offset: (page - 1) * (pageSize || PAGE_SIZE),
      distinct: true,
      // raw: true,
      // nest: true,
      include: {
        model: Product,
        as: 'products',
        // attributes: { include: [['OrderProduct.count', 'count'], 'name', 'price', 'discount'] },
        attributes: ['name', 'price', 'discount'],
        through: { attributes: ['count'] },
      },
    })
    let orders = JSON.parse(JSON.stringify(result.rows))
    orders = orders.map(order => {
      const items = order.products.map(product => {
        const { name, price, discount } = product
        return { name, price, discount, count: product.OrderProduct.count }
      })
      const { products, ...rest } = order
      return { ...rest, products: items }
    })

    // return res.json(orders)
    return res.json({ count: result.count, rows: orders })
  })

  delete = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    const count = await Order.destroy({ where: { id } })

    if (!count) {
      return next(ApiError.notFound(`заказ с id ${id} не найден`))
    }

    return res.status(204).json()
  })
}

module.exports = new subcategoryController()
