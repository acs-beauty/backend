'use strict'
const { Router } = require('express')
// const controllers = require("../controllers/userController");
const authMiddleware = require('../middleware/authMiddleware')
const feedbackController = require('../controllers/feedbackController')
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')
// const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')

const feedbackRouter = Router()

feedbackRouter.post('/', authMiddleware, feedbackController.post)
feedbackRouter.patch('/:id', authMiddleware, feedbackController.patch)
feedbackRouter.delete('/:id', authMiddleware, feedbackController.delete)
feedbackRouter.get('/:productId', feedbackController.get)
feedbackRouter.get('/', adminAuthMiddleware, feedbackController.getPaginated)

module.exports = feedbackRouter
