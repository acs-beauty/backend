"use strict";
const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const orderRouter = Router();

orderRouter.post('/', authMiddleware, orderController.post)
orderRouter.patch('/:id', authMiddleware, orderController.patch)
orderRouter.get('/:id', authMiddleware, orderController.get)
orderRouter.get('/', adminAuthMiddleware, orderController.getPaginated)
orderRouter.delete('/:id', authMiddleware, orderController.delete)

module.exports = orderRouter
