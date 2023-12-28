'use strict'
const { Router } = require('express')
const productController = require('../controllers/productController')
// const middleware = require('../middleware/productMiddleware')
// const validators = require('../middleware/validators')
const authMiddleware = require('../middleware/authMiddleware')

const productRouter = Router()

// productRouter.get(
//   '/getPreviewProducts',
//   validators.validatePreviewProducts,
//   middleware.previewProducts,
//   controllers.getPreviewProducts
// )


productRouter.get('/', productController.getAll)
productRouter.post('/', authMiddleware, productController.post)
productRouter.get('/:id', productController.get)
productRouter.delete('/:id', authMiddleware, productController.delete)

// productRouter.get('/getAllProductIds', controllers.getAllProductIds)
// productRouter.get('/:id', validators.validateProductId, controllers.getProductId)

// productRouter.get('/', validators.validateSearchProducts, controllers.searchProducts)

module.exports = productRouter
