"use strict";
const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const subcategoryController = require("../controllers/subcategoryController");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const subcategoryRouter = Router();

subcategoryRouter.post('/', adminAuthMiddleware, subcategoryController.post)
subcategoryRouter.patch('/:id', adminAuthMiddleware, subcategoryController.patch)
// subcategoryRouter.get('/:id', subcategoryController.get)
subcategoryRouter.delete('/:id', adminAuthMiddleware, subcategoryController.delete)

module.exports = subcategoryRouter
