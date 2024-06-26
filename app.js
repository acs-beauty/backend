'use strict'
const express = require('express')
const cors = require('cors')
const ApiError = require('./errors/ApiError')
const router = require('./router.js')
const cookieParser = require('cookie-parser')
const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware')
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

const app = express()

app.use(cors({ credentials: true, origin: ['http://localhost:5173', 'http://localhost:3000'], sameSite: 'none' }))
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Credentials', true)
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//   res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json')
//   next()
// })
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
// app.use(handlerError);
app.use(errorHandlingMiddleware)
app.use('/public', express.static('../public'))
module.exports = app

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ACS-beauty',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://13.50.16.182:5000/',
      },
    ],
  },
  apis: ['./app.js'],
}
const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.all('*', (req, res, next) => {
  res.status(404).json({
    message: `can't find ${req.originalUrl} path on the server!`,
  })
})

// const { initialize } = require('express-openapi')
// const openapi = require('@wesleytodd/openapi')
// const handlerError = require("./errors/handlerError");

// const apiDoc = {
//   swagger: '2.0',
//   basePath: '/v1',
//   info: {
//     title: 'A getting started API.',
//     version: '1.0.0',
//   },
//   definitions: {
//     World: {
//       type: 'object',
//       properties: {
//         name: {
//           description: 'The name of this world.',
//           type: 'string',
//         },
//       },
//       required: ['name'],
//     },
//   },
//   paths: {},
// }

// initialize({
//   app,
//   // NOTE: If using yaml you can provide a path relative to process.cwd() e.g.
//   apiDoc: apiDoc,
//   // apiDoc: require('v3-api-doc'),
//   // dependencies: {
//   //   worldsService: v1WorldsService,
//   // },
//   paths: './api-v1/paths',
// })

// const oapi = openapi({
//   openapi: '3.0.0',
//   info: {
//     title: 'Express Application',
//     description: 'Generated docs from an Express api',
//     version: '1.0.0',
//   },
// })
// app.use(oapi)
// app.use('/swaggerui', oapi.swaggerui)

/**
 * @swagger
 *  components:
 *      schema:
 *          User:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  email:
 *                      type: string
 *                  note:
 *                      type: string
 *                  phone:
 *                      type: string
 *                  createdAt:
 *                      type: string
 *                      format: date
 *          UserMe:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  email:
 *                      type: string
 *                  phone:
 *                      type: string
 *                  avatar:
 *                      type: string
 *                      example: https://acs-beauty-bucket.s3.eu-north-1.amazonaws.com/user/user1c3b4.jpg
 *          PatchingUser:
 *              type: object
 *              properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  email:
 *                      type: string
 *                  note:
 *                      type: string
 *                  phone:
 *                      type: string
 *                  avatar:
 *                      type: string
 *                      example: byte, formData
 *          UserForRegistration:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *          ReturnedUsers:
 *              type: object
 *              properties:
 *                  count:
 *                      type: integer
 *                  rows:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: number
 *                          firstName:
 *                            type: string
 *                          lastName:
 *                            type: string
 *                          email:
 *                            type: string
 *                          phone:
 *                            type: string
 *                          createdAt:
 *                            type: string
 *                            format: date
 *          PostedCategory:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  image:
 *                      type: string
 *                      example: byte, formData
 *          PostedSubcategory:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  categoryId:
 *                      type: number
 *          PostedBrand:
 *              type: object
 *              properties:
 *                  logo:
 *                      type: string
 *                      example: byte, formData
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *          PostedNews:
 *              type: object
 *              properties:
 *                  banner:
 *                      type: string
 *                      example: byte, formData
 *                  title:
 *                      type: string
 *                  text:
 *                      type: string
 *          PostedSlide:
 *              type: object
 *              properties:
 *                  desktopBanner:
 *                      type: string
 *                      example: byte, formData
 *                  mobileBanner:
 *                      type: string
 *                      example: byte, formData
 *                  priority:
 *                      type: number
 *          PostedProduct:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  price:
 *                      type: number
 *                  discount:
 *                      type: integer
 *                  count:
 *                      type: number
 *                  novelty:
 *                      type: boolean
 *                  hit:
 *                      type: boolean
 *                  subcategoryId:
 *                      type: integer
 *                  brandId:
 *                      type: integer
 *                  imageIds:
 *                      type: string
 *                      example: 1, 2, 3, 4, 5
 *                  images:
 *                      type: string
 *                      example: byte, formData
 *          PostedOrder:
 *              type: object
 *              properties:
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                email:
 *                  type: string
 *                phone:
 *                  type: string
 *                status:
 *                  type: string
 *                  enum: ['pending', 'paid']
 *                deliveryType:
 *                  type: string
 *                  enum: ['novaPoshta', 'ukrPoshta', 'selfDelivery']
 *                address:
 *                  type: string
 *                paymentType:
 *                  type: string
 *                  enum: ['card', 'cash']
 *                tth:
 *                  type: number
 *                comment:
 *                  type: string
 *                productIds:
 *                  type: string
 *                  example: 1, 2, 3, 23
 *                productCounts:
 *                  type: string
 *                  example: 1, 2, 3, 23
 *          PostedFeedback:
 *              type: object
 *              properties:
 *                  review:
 *                      type: string
 *                  rating:
 *                      type: integer
 *                  status:
 *                      type: string
 *                  productId:
 *                      type: integer
 *                  userId:
 *                      type: integer
 *          ReturnedProducts:
 *              type: object
 *              properties:
 *                  count:
 *                      type: integer
 *                  rows:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                          name:
 *                            type: string
 *                          price:
 *                            type: number
 *                          discount:
 *                            type: integer
 *                          count:
 *                            type: number
 *                          novelty:
 *                            type: boolean
 *                          hit:
 *                            type: boolean
 *                          createdAt:
 *                            type: string
 *                            format: date
 *                          subcategoryName:
 *                            type: string
 *                          images:
 *                            type: array
 *                            items:
 *                              type: object
 *                              properties:
 *                                url:
 *                                  type: string
 *                                  example: https://acs-beauty-bucket.s3.eu-north-1.amazonaws.com/product/images (4)c3b4.jpg
 *          ReturnedOrders:
 *              type: object
 *              properties:
 *                  count:
 *                      type: integer
 *                  rows:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: number
 *                          firstName:
 *                            type: string
 *                          lastName:
 *                            type: string
 *                          status:
 *                            type: string
 *                            enum: ['pending', 'paid']
 *                          deliveryType:
 *                            type: string
 *                          tth:
 *                            type: number
 *                          comment:
 *                            type: string
 *                          createdAt:
 *                            type: string
 *                            format: date
 *                          total:
 *                            type: number
 *          ReturnedBrands:
 *              type: object
 *              properties:
 *                  count:
 *                      type: integer
 *                  rows:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: integer
 *                          logo:
 *                            type: string
 *                            example: https://acs-beauty-bucket.s3.eu-north-1.amazonaws.com/brand/brand1c3b4.jpg
 *                          name:
 *                            type: string
 *                          description:
 *                            type: string
 *                          createdAt:
 *                            type: string
 *                            format: date
 *          FindedNews:
 *              type: object
 *              properties:
 *                  count:
 *                      type: integer
 *                  rows:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: integer
 *                          banner:
 *                            type: string
 *                            example: https://acs-beauty-bucket.s3.eu-north-1.amazonaws.com/news/news1c3b4.jpg
 *                          title:
 *                            type: string
 *                          text:
 *                            type: string
 *                          createdAt:
 *                            type: string
 *                            format: date
 *          FindedSlides:
 *              type: object
 *              properties:
 *                  count:
 *                      type: integer
 *                  rows:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: integer
 *                          desktopBanner:
 *                            type: string
 *                          mobileBanner:
 *                            type: string
 *                          priority:
 *                            type: number
 *                          createdAt:
 *                            type: string
 *                            format: date
 *          ReturnedCategory:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  image:
 *                      type: string
 *          ReturnedCategories:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  image:
 *                      type: string
 *                  subcategories:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: integer
 *                          name:
 *                            type: string
 *
 *          ReturnedSubcategory:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 *                  categoryId:
 *                      type: number
 *          ReturnedBrand:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  logo:
 *                      type: string
 *                      example: https://acs-beauty-bucket.s3.eu-north-1.amazonaws.com/brand/brand1c3b4.jpg
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  createdAt:
 *                      type: string
 *                      format: date
 *          ReturnedNews:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  banner:
 *                      type: string
 *                      example: https://acs-beauty-bucket.s3.eu-north-1.amazonaws.com/news/news1c3b4.jpg
 *                  title:
 *                      type: string
 *                  text:
 *                      type: string
 *                  createdAt:
 *                      type: string
 *                      format: date
 *          ReturnedSlide:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  desktopBanner:
 *                      type: string
 *                  mobileBanner:
 *                      type: string
 *                  priority:
 *                      type: string
 *                  createdAt:
 *                      type: string
 *                      format: date
 *          ReturnedProduct:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  price:
 *                      type: integer
 *                  discount:
 *                      type: integer
 *                  count:
 *                      type: integer
 *                  novelty:
 *                      type: boolean
 *                  hit:
 *                      type: boolean
 *                  createdAt:
 *                      type: string
 *                      format: date
 *                  updatedAt:
 *                      type: string
 *                      format: date
 *                  brandId:
 *                      type: number
 *                  subcategoryId:
 *                      type: number
 *                  images:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: integer
 *                          url:
 *                            type: string
 *                            example: https://acs-beauty-bucket.s3.eu-north-1.amazonaws.com/product/images (4)c3b4.jpg
 *                          productId:
 *                            type: integer
 *          ReturnedProductById:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  price:
 *                      type: integer
 *                  discount:
 *                      type: integer
 *                  count:
 *                      type: integer
 *                  novelty:
 *                      type: boolean
 *                  hit:
 *                      type: boolean
 *                  subcategory:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                        name:
 *                          type: string
 *                        category:
 *                          type: object
 *                          properties:
 *                            id:
 *                              type: integer
 *                            name:
 *                              type: string
 *                  brand:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                        name:
 *                          type: string
 *                  images:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: integer
 *                          url:
 *                            type: string
 *                            example: https://acs-beauty-bucket.s3.eu-north-1.amazonaws.com/product/images (4)c3b4.jpg
 *          ReturnedOrder:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                email:
 *                  type: string
 *                phone:
 *                  type: string
 *                status:
 *                  type: string
 *                  enum: ['pending', 'paid']
 *                deliveryType:
 *                  type: string
 *                  enum: ['novaPoshta', 'ukrPoshta', 'selfDelivery']
 *                address:
 *                  type: string
 *                paymentType:
 *                  type: string
 *                  enum: ['card', 'cash']
 *                tth:
 *                  type: number
 *                comment:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                  format: date
 *                products:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                      price:
 *                        type: number
 *                      discount:
 *                        type: number
 *                      count:
 *                        type: number
 *                      images:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                            url:
 *                              type: string
 *                              example: https://acs-beauty-bucket.s3.eu-north-1.amazonaws.com/product/images (4)c3b4.jpg
 *          ReturnedFeedback:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  review:
 *                      type: string
 *                  rating:
 *                      type: integer
 *                  status:
 *                      type: string
 *                  productId:
 *                      type: integer
 *                  userId:
 *                      type: integer
 *                  createdAt:
 *                      string: integer
 *                      format: date
 *          ReturnedFeedbackWithUserName:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  review:
 *                      type: string
 *                  rating:
 *                      type: integer
 *                  status:
 *                      type: string
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  createdAt:
 *                      string: integer
 *                      format: date
 *          ReturnedFeedbackWithUserNameAndProduct:
 *              type: object
 *              properties:
 *                  count:
 *                      type: integer
 *                  rows:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: integer
 *                          review:
 *                            type: string
 *                          rating:
 *                            type: integer
 *                          status:
 *                            type: string
 *                          firstName:
 *                            type: string
 *                          lastName:
 *                            type: string
 *                          productName:
 *                            type: string
 *                          createdAt:
 *                            string: integer
 *                            format: date
 *          token:
 *              type: object
 *              properties:
 *                  token:
 *                      type: string
 * securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *
 * security:
 * - bearerAuth: []
 */

/**
 * @swagger
 * /api/user/me:
 *  get:
 *      summary: get my own account info
 *      responses:
 *          200:
 *              description: to get my own account info
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/UserMe'
 */

/**
 * @swagger
 * /api/user/me:
 *  patch:
 *      summary: patch my account with avatar
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PatchingUser'
 *      responses:
 *          200:
 *              description: patched successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/UserMe'
 */

/**
 * @swagger
 * /api/user/registration:
 *  post:
 *      summary: register user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/UserForRegistration'
 *      responses:
 *          201:
 *              description: registered successfully
 */

/**
 * @swagger
 * /api/user/login:
 *  post:
 *      summary: login user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/UserForRegistration'
 *      responses:
 *          200:
 *              description: logined successfully
 */

/**
 * @swagger
 * /api/user/logout:
 *  post:
 *      summary: user logout
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/UserForRegistration'
 *      responses:
 *          200:
 *              description: logouted successfully
 */

/**
 * @swagger
 * /api/user/activate/{token}:
 *  get:
 *      summary: activate from email link and redirect to link
 *      parameters:
 *        - in: path
 *          name: token
 *          schema:
 *              type: string
 *          required: true
 */

/**
 * @swagger
 * /api/user/refresh:
 *  get:
 *      summary: update refreshToken
 */

/**
 * @swagger
 * /api/user/{id}:
 *  delete:
 *      summary: delete user
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          204:
 *              description: deleted successfully
 */

/**
 * @swagger
 * /api/user/{id}:
 *  patch:
 *      summary: patch user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PatchingUser'
 *      responses:
 *          200:
 *              description: patched successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/User'
 */

/**
 * @swagger
 * /api/user?page=1&pageSize=25&lookup=id|firstName|lastName|email|phone:
 *  get:
 *      summary: get users
 *      parameters:
 *        - in: path
 *          name: page
 *          schema:
 *              type: integer
 *          required: true
 *
 *      responses:
 *          200:
 *              description: get successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedUsers'
 */

/**
 * @swagger
 * /api/category:
 *  get:
 *      summary: get categories
 *
 *      responses:
 *          200:
 *              description: get successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedCategories'
 */

// /**
//  * @swagger
//  * /api/category/{id}:
//  *  get:
//  *      summary: get category
//  *      parameters:
//  *        - in: path
//  *          name: id
//  *          schema:
//  *              type: integer
//  *          required: true
//  *
//  *      responses:
//  *          200:
//  *              description: get successfully
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          items:
//  *                              $ref: '#components/schema/ReturnedCategory'
//  */

/**
 * @swagger
 * /api/category:
 *  post:
 *      summary: add category
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedCategory'
 *      responses:
 *          200:
 *              description: added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedCategory'
 */

/**
 * @swagger
 * /api/category:
 *  patch:
 *      summary: patch category
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedCategory'
 *      responses:
 *          200:
 *              description: patched successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedCategory'
 */

/**
 * @swagger
 * /api/category/{id}:
 *  delete:
 *      summary: delete category
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          204:
 *              description: deleted successfully
 */

// /**
//  * @swagger
//  * /api/subcategory/{id}:
//  *  get:
//  *      summary: get subcategory
//  *      parameters:
//  *        - in: path
//  *          name: id
//  *          schema:
//  *              type: integer
//  *          required: true
//  *
//  *      responses:
//  *          200:
//  *              description: get successfully
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          items:
//  *                              $ref: '#components/schema/ReturnedSubcategory'
//  */

/**
 * @swagger
 * /api/subcategory:
 *  post:
 *      summary: add subcategory
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedSubcategory'
 *      responses:
 *          200:
 *              description: added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedSubcategory'
 */

/**
 * @swagger
 * /api/subcategory/{id}:
 *  patch:
 *      summary: patch subcategory
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedSubcategory'
 *      responses:
 *          200:
 *              description: patched successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedSubcategory'
 */

/**
 * @swagger
 * /api/subcategory/{id}:
 *  delete:
 *      summary: delete subcategory
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          204:
 *              description: deleted successfully
 */

/**
 * @swagger
 * /api/product/{id}:
 *  get:
 *      summary: get product
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *
 *      responses:
 *          200:
 *              description: get successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedProductById'
 */

/**
 * @swagger
 * /api/product?page=1&pageSize=25&availability=true&discount=true&category=23&lookup=id|productName:
 *  get:
 *      summary: get products
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *
 *      responses:
 *          200:
 *              description: get successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedProducts'
 */

/**
 * @swagger
 * /api/product:
 *  post:
 *      summary: add product
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedProduct'
 *      responses:
 *          200:
 *              description: added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedProduct'
 */

/**
 * @swagger
 * /api/product/{id}:
 *  patch:
 *      summary: patch product
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedProduct'
 *      responses:
 *          200:
 *              description: added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedProduct'
 */

/**
 * @swagger
 * /api/product/{id}:
 *  delete:
 *      summary: delete product
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          204:
 *              description: deleted successfully
 */

/**
 * @swagger
 * /api/order?page=1&pageSize=25&lookup=firstName|lastName|tth&status=paid|pending&deliveryType=ukrPoshta|novaPoshta|selfDelivery:
 *  get:
 *      summary: get orders
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *
 *      responses:
 *          200:
 *              description: get successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedOrders'
 */

/**
 * @swagger
 * /api/order/{id}:
 *  get:
 *      summary: get order by id
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *
 *      responses:
 *          200:
 *              description: get successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedOrder'
 */

/**
 * @swagger
 * /api/order:
 *  post:
 *      summary: add order
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedOrder'
 *      responses:
 *          200:
 *              description: added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedOrder'
 */

/**
 * @swagger
 * /api/order/{id}:
 *  patch:
 *      summary: patch order
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedOrder'
 *      responses:
 *          200:
 *              description: added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedOrder'
 */

/**
 * @swagger
 * /api/order/{id}:
 *  delete:
 *      summary: delete order
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          204:
 *              description: deleted successfully
 */

// /**
//  * @swagger
//  * /api/brand/{id}:
//  *  get:
//  *      summary: get brand
//  *      parameters:
//  *        - in: path
//  *          name: id
//  *          schema:
//  *              type: integer
//  *          required: true
//  *
//  *      responses:
//  *          200:
//  *              description: get successfully
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          items:
//  *                              $ref: '#components/schema/ReturnedBrand'
//  */

/**
 * @swagger
 * /api/brand?page=1&pageSize=12&lookup=name:
 *  get:
 *      summary: get brands
 *
 *      responses:
 *          200:
 *              description: get successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedBrands'
 */

/**
 * @swagger
 * /api/brand:
 *  post:
 *      summary: add brand
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedBrand'
 *      responses:
 *          200:
 *              description: added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedBrand'
 */

/**
 * @swagger
 * /api/brand/{id}:
 *  patch:
 *      summary: patch brand
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedBrand'
 *      responses:
 *          200:
 *              description: patched successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedBrand'
 */

/**
 * @swagger
 * /api/brand/{id}:
 *  delete:
 *      summary: delete brand
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          204:
 *              description: deleted successfully
 */

/**
 * @swagger
 * /api/feedback:
 *  post:
 *      summary: add feedback
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedFeedback'
 *      responses:
 *          200:
 *              description: added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedFeedback'
 */

/**
 * @swagger
 * /api/feedback/{id}:
 *  patch:
 *      summary: patch feedback
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedFeedback'
 *      responses:
 *          200:
 *              description: patched successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedFeedback'
 */

/**
 * @swagger
 * /api/feedback/{id}:
 *  delete:
 *      summary: delete feedback
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          204:
 *              description: deleted successfully
 */

/**
 * @swagger
 * /api/feedback/{productId}:
 *  get:
 *      summary: get feedbacks to concrete product
 *      parameters:
 *        - in: path
 *          name: productId
 *          schema:
 *              type: integer
 *          required: true
 *
 *      responses:
 *          200:
 *              description: get feedbacks successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedFeedbackWithUserName'
 */

/**
 * @swagger
 * /api/feedback?page=1&pageSize=25&status=pending|published&rating=positive|neutral|negative&lookup=id|firstName|lastName|productName|review:
 *  get:
 *      summary: get paginated feedbacks
 *      parameters:
 *        - in: path
 *          name: page
 *          schema:
 *              type: integer
 *          required: true
 *
 *      responses:
 *          200:
 *              description: get feedbacks successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedFeedbackWithUserNameAndProduct'
 */

/**
 * @swagger
 * /api/news?page=1&pageSize=12&lookup=name:
 *  get:
 *      summary: get news
 *
 *      responses:
 *          200:
 *              description: get successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/FindedNews'
 */

/**
 * @swagger
 * /api/news:
 *  post:
 *      summary: add news
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedNews'
 *      responses:
 *          200:
 *              description: added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedNews'
 */

/**
 * @swagger
 * /api/news/{id}:
 *  patch:
 *      summary: patch news
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedNews'
 *      responses:
 *          200:
 *              description: patched successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedNews'
 */

/**
 * @swagger
 * /api/news/{id}:
 *  delete:
 *      summary: delete news
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          204:
 *              description: deleted successfully
 */

/**
 * @swagger
 * /api/slide?page=1&pageSize=12:
 *  get:
 *      summary: get slides
 *
 *      responses:
 *          200:
 *              description: get successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/FindedSlides'
 */

/**
 * @swagger
 * /api/slide:
 *  post:
 *      summary: add slide
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedSlide'
 *      responses:
 *          200:
 *              description: added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedSlide'
 */

/**
 * @swagger
 * /api/slide/{id}:
 *  patch:
 *      summary: patch slide
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/PostedSlide'
 *      responses:
 *          200:
 *              description: patched successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/ReturnedSlide'
 */

/**
 * @swagger
 * /api/slide/{id}:
 *  delete:
 *      summary: delete slide
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          204:
 *              description: deleted successfully
 */
