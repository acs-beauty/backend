'use strict'
const { Router } = require('express')
const controllers = require('../controllers/productControllers')
const middleware = require('../middleware/productMiddleware')
const validators = require('../middleware/validators')

const productRouter = Router()

productRouter.get(
  '/getPreviewProducts',
  validators.validatePreviewProducts,
  middleware.previewProducts,
  controllers.getPreviewProducts
)

productRouter.get('/getAllProductIds', controllers.getAllProductIds)
productRouter.get('/:id', validators.validateProductId, controllers.getProductId)

productRouter.get('/', validators.validateSearchProducts, controllers.searchProducts)

module.exports = productRouter
