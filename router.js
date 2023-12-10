"use strict";
const { Router } = require("express");
const checkToken = require("./middleware/checkToken");
const checkRoles = require("./middleware/checkRoles");

const router = Router();

const authRouter = require("./routes/authRouter");
router.use("/auth", authRouter);

const productRouter = require("./routes/productRouter");
router.use("/products", productRouter);

const categoryRouter = require("./routes/categoryRouter");
router.use("/category", categoryRouter);

const subcategoryRouter = require('./routes/subcategoryRouter')
router.use('/subcategory', subcategoryRouter)

const adminRouter = require("./routes/adminRouter");
router.use(
  "/admin",
  checkToken.checkToken,
  checkRoles.onlyForAdmin,
  adminRouter
);

const userRouter = require("./routes/userRouter");
router.use("/user", userRouter);

module.exports = router;
