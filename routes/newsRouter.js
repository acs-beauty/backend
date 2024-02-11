"use strict";
const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const newsController = require("../controllers/newsController");
const multer = require('multer');
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const getFields = multer()

const newsRouter = Router();

newsRouter.post('/', adminAuthMiddleware, getFields.any(), newsController.post)
newsRouter.get('/', newsController.getPaginated)
newsRouter.patch('/:id', getFields.any(), adminAuthMiddleware, newsController.patch)
newsRouter.delete('/:id', adminAuthMiddleware, newsController.delete)

module.exports = newsRouter
