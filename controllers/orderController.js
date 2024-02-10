const { PAGE_SIZE } = require('../constants')
const ApiError = require('../errors/ApiError')
const asyncErrorHandler = require('../errors/asyncErrorHandler')
const { Order, Product, OrderProduct, Image } = require('../models')
const { Op, col } = require('sequelize')
const { formatOrders, formatOrder } = require('../utils/formatOrders')

class subcategoryController {
  post = asyncErrorHandler(async (req, res, next) => {
    const { productIds, productCounts } = req.body
    // if (!name) {
    //   return next(ApiError.badRequest('Не передано поле name'))
    // }
    // if (!categoryId) {
    //   return next(ApiError.badRequest('Не передано поле categoryId'))
    // }

    let ids = productIds.split(',')
    ids = ids.map(id => +id)
    let counts = productCounts.split(',')
    counts = counts.map(id => +id)
    const objects = []

    let order = await Order.create(req.body)
    for (let i = 0; i < ids.length; i++) {
      objects.push({ orderId: order.dataValues.id, productId: ids[i], count: counts[i] })
    }
    await OrderProduct.bulkCreate(objects)

    order = await Order.findByPk(order.dataValues.id, {
      distinct: true,
      include: {
        model: Product,
        as: 'products',
        // attributes: ['name', 'price', 'discount', [col('OrderProduct.count'), 'count']],
        attributes: ['name', 'price', 'discount'],
        // include: {
        //   model: Order,
        //   // attributes
        // },
        through: { attributes: ['count'] },
      },
    })
    order = formatOrder(order.toJSON())
    return res.status(201).json(order)
  })

  patch = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params
    const { productIds, productCounts, newProductIds, newProductCounts, ...rest } = req.body

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    let [count, [order]] = await Order.update(rest, {
      where: {
        id,
      },
      returning: true,
    })
    if (!count) {
      return next(ApiError.notFound(`Заказ с id ${id} не найден`))
    }

    let ids = productIds.split(',')
    ids = ids.map(id => +id)
    let counts = productCounts.split(',')
    counts = counts.map(id => +id)

    // await OrderProduct.destroy({ where: { productId: { [Op.in]: itemsForDeleting.map(item => item.productId) }, orderId: id } })
    await OrderProduct.destroy({ where: { orderId: id } })

    const objects = []

    for (let i = 0; i < ids.length; i++) {
      objects.push({ orderId: id, productId: ids[i], count: counts[i] })
    }

    await OrderProduct.bulkCreate(objects)

    order = await Order.findByPk(id, {
      include: {
        model: Product,
        as: 'products',
        attributes: ['name', 'price', 'discount'],
        through: { attributes: ['count'] },
      },
    })

    order = formatOrder(order.toJSON())

    return res.json(order)
  })

  get = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      return next(ApiError.badRequest('Не передан параметр id'))
    }

    let order = await Order.findByPk(id, {
      // attributes: { exclude: ['createdAt', 'updatedAt', 'brandId', 'subcategoryId'] },
      // attributes: { exclude: ['phone', 'email', 'paymentType', 'address'] },
      include: {
        model: Product,
        as: 'products',
        // attributes: ['name', 'price', 'discount'],
        through: { attributes: ['count'] },
        include: {
          model: Image,
          as: 'images',
          attributes: ['url'],
          limit: 1,
        },
      },
    })
    if (!order) {
      return next(ApiError.notFound(`Заказ с id ${id} не найден`))
    }
    console.log('order = ', order.toJSON())
    order = formatOrder(order.toJSON())
    return res.json(order)
  })

  getPaginated = asyncErrorHandler(async (req, res, next) => {
    const { pageSize, page, lookup, status, deliveryType } = req.query

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

    if (deliveryType) {
      where.deliveryType = deliveryType
    }

    if (status) {
      where.status = status
    }

    let result = await Order.findAndCountAll({
      where,
      limit: pageSize || PAGE_SIZE,
      offset: (page - 1) * (pageSize || PAGE_SIZE),
      distinct: true,
      attributes: { exclude: ['phone', 'email', 'paymentType', 'address'] },
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
    let orders = result.rows.map(item => item.toJSON())
    orders = formatOrders(orders)

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
