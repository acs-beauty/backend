'use strict'
const { Router } = require('express')

const router = Router()

const authRouter = require('./routes/authRouter')
router.use('/auth', authRouter)

const productRouter = require('./routes/productRouter')
router.use('/product', productRouter)

const categoryRouter = require('./routes/categoryRouter')
router.use('/category', categoryRouter)

const subcategoryRouter = require('./routes/subcategoryRouter')
router.use('/subcategory', subcategoryRouter)

const brandRouter = require('./routes/brandRouter')
router.use('/brand', brandRouter)

const newsRouter = require('./routes/newsRouter')
router.use('/news', newsRouter)

const userRouter = require('./routes/userRouter')
router.use('/user', userRouter)

const feedbackRouter = require('./routes/feedbackRouter')
router.use('/feedback', feedbackRouter)

module.exports = router
