'use strict'
const express = require('express')
const cors = require('cors')
const router = require('./router.js')
// const handlerError = require("./errors/handlerError");
const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware')

const app = express()
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

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

app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.use('/public', express.static('../public'))

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
 *                  isAdmin:
 *                      type: boolean
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
 *          PostedSubcategory:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  CategoryId:
 *                      type: string
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
 *          ReturnedSubcategory:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 *                  CategoryId:
 *                      type: string
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

app.use('/api', router)
// app.use(handlerError);
app.use(errorHandlingMiddleware)

module.exports = app
