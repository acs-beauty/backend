'use strict'
const { Router } = require('express')
// const controllers = require("../controllers/userController");
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const multer = require('multer')
const getFields = multer()
// const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')

const userRouter = Router()

userRouter.post('/registration', userController.registration)
userRouter.post('/login', userController.login)
userRouter.get('/me', authMiddleware, userController.me)
userRouter.patch('/me', authMiddleware, getFields.any(), userController.patchMe)
userRouter.patch('/:id', authMiddleware, userController.patch)
userRouter.delete('/:id', authMiddleware, userController.delete)
userRouter.get('/', authMiddleware, userController.getPaginated)

module.exports = userRouter
