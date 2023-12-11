"use strict";
const { Router } = require("express");
const checkToken = require("../middleware/checkToken");
// const controllers = require("../controllers/userController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const userRouter = Router();

// userRouter.get("/", checkToken.checkToken, userController.get);
/**
 * @swagger
 * /:
 *  get:
 *      summary: register user
 *      responses: 
 *          200:
 *              description: to register
 */
userRouter.post('/registration', userController.registration)
userRouter.post('/login', userController.login)
userRouter.get("/me", authMiddleware, userController.me);

// userRouter.patch('/', checkToken.checkToken, userController.patch)

module.exports = userRouter;
