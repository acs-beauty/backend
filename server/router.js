"use strict";
const { Router } = require("express");

const router = Router();

const authRouter = require("./routes/authRouter");
router.use("/auth", authRouter);

const productRouter = require("./routes/productRouter");
router.use("/products", productRouter);

const categoryRouter = require("./routes/categoryRouter");
router.use("/category", categoryRouter);

const adminRouter = require("./routes/adminRouter");
router.use("/admin", adminRouter);

const userRouter = require("./routes/userRouter");
router.use("/user", userRouter);

module.exports = router;
