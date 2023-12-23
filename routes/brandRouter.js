"use strict";
const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const brandController = require("../controllers/brandController");

const brandRouter = Router();

brandRouter.post('/', authMiddleware, brandController.post)
brandRouter.get('/', brandController.getAll)
// brandRouter.get('/:id', brandController.get)
brandRouter.delete('/:id', authMiddleware, brandController.delete)

module.exports = brandRouter
