"use strict";
const { Router } = require("express");
const controllers = require("../controllers/categoryControllers");
const validators = require("../middleware/validators");

const categoryRouter = Router();

categoryRouter.get("/getNavigation", controllers.getNavigation);

categoryRouter.get(
  "/getCategoryByLinkKey/:linkKey",
  validators.validateLinkKey,
  controllers.getCategoryByLinkKey
);

categoryRouter.get(
  "/getSubcategoryByLinkKey/:linkKey",
  validators.validateLinkKey,
  controllers.getSubcategoryByLinkKey
);

module.exports = categoryRouter;
