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

app.use(cors())
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
        url: 'http://localhost:5000/',
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
 *                  phone:
 *                      type: string
 *                  createdAt:
 *                      type: string
 *                      format: date
 *                  updatedAt:
 *                      type: string
 *                      format: date
 *          UserForRegistration:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *          PostedCategory:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *          PatchedCategory:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  slug:
 *                      type: string
 *          PostedSubcategory:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  CategoryId:
 *                      type: string
 *          PostedBrand:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
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
 *                  novelty:
 *                      type: boolean
 *                  hit:
 *                      type: boolean
 *                  SubcategoryId:
 *                      type: integer
 *                  BrandId:
 *                      type: integer
 *
 *          ReturnedCategory:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 *                  slug:
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
 *                  CategoryId:
 *                      type: string
 *          ReturnedBrand:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
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
 *                  novelty:
 *                      type: boolean
 *                  hit:
 *                      type: boolean
 *                  SubcategoryId:
 *                      type: integer
 *                  BrandId:
 *                      type: integer
 *
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
 *      summary: get my account info
 *      responses:
 *          200:
 *              description: to get my account info
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/User'
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
 *          200:
 *              description: registered successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/token'
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#components/schema/token'
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

/**
 * @swagger
 * /api/category/{id}:
 *  get:
 *      summary: get category
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
 *                              $ref: '#components/schema/ReturnedCategory'
 */

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
 *                      $ref: '#components/schema/PatchedCategory'
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

/**
 * @swagger
 * /api/subcategory/{id}:
 *  get:
 *      summary: get subcategory
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
 *                              $ref: '#components/schema/ReturnedSubcategory'
 */

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
 *                              $ref: '#components/schema/ReturnedProduct'
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
 * /api/brand/{id}:
 *  get:
 *      summary: get brand
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
 *                              $ref: '#components/schema/ReturnedBrand'
 */

/**
 * @swagger
 * /api/brand/:
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
 *                              $ref: '#components/schema/ReturnedBrand'
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
