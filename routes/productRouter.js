'use strict'
const { Router } = require('express')
const productController = require('../controllers/productController')
// const middleware = require('../middleware/productMiddleware')
// const validators = require('../middleware/validators')
const authMiddleware = require('../middleware/authMiddleware')
const multer = require('multer')
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')
const getFields = multer()

const productRouter = Router()

// productRouter.get(
//   '/getPreviewProducts',
//   validators.validatePreviewProducts,
//   middleware.previewProducts,
//   controllers.getPreviewProducts
// )


productRouter.get('/', productController.getPaginated)
productRouter.post('/', adminAuthMiddleware, getFields.any(), productController.post)
productRouter.patch('/:id', adminAuthMiddleware, getFields.any(), productController.patch)
productRouter.get('/:id', authMiddleware, productController.get)
productRouter.delete('/:id', adminAuthMiddleware, productController.delete)

// productRouter.get('/getAllProductIds', controllers.getAllProductIds)
// productRouter.get('/:id', validators.validateProductId, controllers.getProductId)

// productRouter.get('/', validators.validateSearchProducts, controllers.searchProducts)

module.exports = productRouter
