"use strict";
const { Router } = require("express");

const router = Router();

const productRouter = require("./routes/productRouter");
router.use("/products", productRouter);

const categoryRouter = require("./routes/categoryRouter");
router.use("/category", categoryRouter);

module.exports = router;
