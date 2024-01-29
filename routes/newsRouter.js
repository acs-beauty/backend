"use strict";
const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const newsController = require("../controllers/newsController");
const multer = require('multer')
const getFields = multer()

const newsRouter = Router();

newsRouter.post('/', authMiddleware, getFields.any(), newsController.post)
newsRouter.get('/', newsController.getPaginated)
newsRouter.patch('/:id', getFields.any(), authMiddleware, newsController.patch)
newsRouter.delete('/:id', authMiddleware, newsController.delete)

module.exports = newsRouter
