'use strict'
const { Router } = require('express')
// const controllers = require("../controllers/userController");
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const multer = require('multer')
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')
const getFields = multer()
// const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')

const userRouter = Router()

userRouter.post('/registration', userController.registration)
userRouter.post('/login', userController.login)
userRouter.post('/logout', authMiddleware, userController.logout)
userRouter.get('/activate/:token', userController.activate)
userRouter.get('/refresh', userController.refresh)
userRouter.get('/me', authMiddleware, userController.me)
userRouter.patch('/me', authMiddleware, getFields.any(), userController.patchMe)
userRouter.patch('/:id', adminAuthMiddleware, userController.patch)
userRouter.delete('/:id', adminAuthMiddleware, userController.delete)
userRouter.get('/', adminAuthMiddleware, userController.getPaginated)

module.exports = userRouter
