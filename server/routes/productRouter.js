"use strict";
const { Router } = require("express");
const controllers = require("../controllers/productControllers");
const middleware = require("../middleware/productMiddleware");
const validators = require("../middleware/validators");

const productRouter = Router();

productRouter.get(
  "/getPreviewProducts",
  validators.validatePreviewProducts,
  middleware.previewProducts,
  controllers.getPreviewProducts
);

productRouter.get(
  "/getProductId/:productId",
  validators.validateProductId,
  controllers.getProductId
);

productRouter.get(
  "/searchProduct",
  validators.validateSearchProducts,
  controllers.searchProducts
);

productRouter.get("/getAllProductIds", controllers.getAllProductIds);

module.exports = productRouter;
