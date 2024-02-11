"use strict";
const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const slideController = require("../controllers/slideController");
const multer = require('multer');
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const getFields = multer()

const slideRouter = Router();

slideRouter.post('/', adminAuthMiddleware, getFields.any(), slideController.post)
slideRouter.get('/', slideController.getPaginated)
slideRouter.patch('/:id', getFields.any(), adminAuthMiddleware, slideController.patch)
slideRouter.delete('/:id', adminAuthMiddleware, slideController.delete)

module.exports = slideRouter
