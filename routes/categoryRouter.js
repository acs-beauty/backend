"use strict";
const { Router } = require("express");
// const controllers = require("../controllers/categoryControllers");
// const validators = require("../middleware/validators");
const categoryController = require("../controllers/categoryController");
const multer = require('multer');
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const getFields = multer()

const categoryRouter = Router();

categoryRouter.post('/', adminAuthMiddleware, getFields.any(), categoryController.post)
categoryRouter.patch('/:id', adminAuthMiddleware, getFields.any(), categoryController.patch)
categoryRouter.get('/', categoryController.getAll)
// categoryRouter.get('/:id', categoryController.get)
// categoryRouter.patch('/', authMiddleware, categoryController.post)
categoryRouter.delete('/:id', adminAuthMiddleware, categoryController.delete)

// categoryRouter.get(
//   "/getCategoryByLinkKey/:linkKey",
//   validators.validateLinkKey,
//   controllers.getCategoryByLinkKey
// );

// categoryRouter.get(
//   "/getSubcategoryByLinkKey/:linkKey",
//   validators.validateLinkKey,
//   controllers.getSubcategoryByLinkKey
// );

module.exports = categoryRouter;
