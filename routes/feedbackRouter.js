'use strict'
const { Router } = require('express')
// const controllers = require("../controllers/userController");
const authMiddleware = require('../middleware/authMiddleware')
const feedbackController = require('../controllers/feedbackController')
// const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')

const feedbackRouter = Router()

feedbackRouter.post('/', authMiddleware, feedbackController.post)
feedbackRouter.delete('/:id', authMiddleware, feedbackController.delete)
// feedbackRouter.get('/:productId', feedbackController.getByProduct)
// feedbackRouter.get('/', authMiddleware, feedbackController.getPaginated)

module.exports = feedbackRouter
