"use strict";
const { Router } = require("express");
const brandController = require("../controllers/brandController");
const multer = require('multer');
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const getFields = multer()

const brandRouter = Router();

brandRouter.post('/', adminAuthMiddleware, getFields.any(), brandController.post)
brandRouter.get('/', brandController.getPaginated)
brandRouter.patch('/:id', getFields.any(), adminAuthMiddleware, brandController.patch)
brandRouter.delete('/:id', adminAuthMiddleware, brandController.delete)

module.exports = brandRouter
