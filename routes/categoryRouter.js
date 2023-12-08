"use strict";
const { Router } = require("express");
// const controllers = require("../controllers/categoryControllers");
// const validators = require("../middleware/validators");
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

const categoryRouter = Router();

categoryRouter.post('/', authMiddleware, categoryController.post)
categoryRouter.get('/:id', categoryController.get)
// categoryRouter.patch('/', authMiddleware, categoryController.post)
categoryRouter.delete('/:id', authMiddleware, categoryController.delete)

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
