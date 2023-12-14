"use strict";
const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const subcategoryController = require("../controllers/subcategoryController");

const subcategoryRouter = Router();

subcategoryRouter.post('/', authMiddleware, subcategoryController.post)
subcategoryRouter.patch('/:id', authMiddleware, subcategoryController.patch)
subcategoryRouter.get('/:id', subcategoryController.get)
subcategoryRouter.delete('/:id', authMiddleware, subcategoryController.delete)

module.exports = subcategoryRouter
