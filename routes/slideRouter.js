"use strict";
const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const slideController = require("../controllers/slideController");
const multer = require('multer')
const getFields = multer()

const slideRouter = Router();

slideRouter.post('/', authMiddleware, getFields.any(), slideController.post)
slideRouter.get('/', slideController.getPaginated)
slideRouter.patch('/:id', getFields.any(), authMiddleware, slideController.patch)
slideRouter.delete('/:id', authMiddleware, slideController.delete)

module.exports = slideRouter
