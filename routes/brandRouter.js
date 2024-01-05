"use strict";
const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const brandController = require("../controllers/brandController");
const multer = require('multer')
const getFields = multer()

const brandRouter = Router();

brandRouter.post('/', authMiddleware, getFields.any(), brandController.post)
brandRouter.get('/', brandController.getAll)
// brandRouter.get('/:id', brandController.get)
brandRouter.delete('/:id', authMiddleware, brandController.delete)

module.exports = brandRouter
