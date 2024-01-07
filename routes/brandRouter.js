"use strict";
const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const brandController = require("../controllers/brandController");
const multer = require('multer')
const getFields = multer()

const brandRouter = Router();

brandRouter.post('/', authMiddleware, getFields.any(), brandController.post)
brandRouter.get('/', brandController.getPaginated)
brandRouter.patch('/:id', getFields.any(), authMiddleware, brandController.patch)
brandRouter.delete('/:id', authMiddleware, brandController.delete)

module.exports = brandRouter
