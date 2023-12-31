'use strict'
const { Router } = require('express')
// const controllers = require("../controllers/userController");
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
// const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')

const userRouter = Router()

userRouter.post('/registration', userController.registration)
userRouter.post('/login', userController.login)
userRouter.get('/me', authMiddleware, userController.me)
userRouter.patch('/:id', authMiddleware, userController.patch)
userRouter.delete('/:id', authMiddleware, userController.delete)
userRouter.get('/', authMiddleware, userController.getAll)

module.exports = userRouter
