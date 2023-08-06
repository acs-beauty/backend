"use strict";
const { Router } = require("express");
const {
  getNavigation,
  getCategoryByLinkKey,
  getSubcategoryByLinkKey,
} = require("../controllers/categoryControllers");
const validators = require("../middleware/validators");

const categoryRouter = Router();

categoryRouter.get("/getNavigation", getNavigation);

categoryRouter.get(
  "/getCategoryByLinkKey/:linkKey",
  validators.validateLinkKey,
  getCategoryByLinkKey
);

categoryRouter.get(
  "/getSubcategoryByLinkKey/:linkKey",
  validators.validateLinkKey,
  getSubcategoryByLinkKey
);

module.exports = categoryRouter;
