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
 *                              $ref: '#components/schema/User'
 */

app.use('/api', router)
// app.use(handlerError);
app.use(errorHandlingMiddleware)

module.exports = app
