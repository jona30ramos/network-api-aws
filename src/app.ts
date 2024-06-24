/* eslint-disable node/no-unpublished-import */

import serverless from 'serverless-http'
import express, { Request, Response } from 'express'
import * as swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import * as swaggerDocument from '../build/swagger.json'
import { RegisterRoutes } from '../build/routes'
import { handleError } from './middlewares'

const app = express()

const corsOptions = {
  origin: [
    'https://kyc-dev.chivowallet.com',
    'http://localhost:3000',
    'https://dxv77517aqbv5.cloudfront.net',
  ],
  methods: ['POST', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Api-Key'],
  credentials: false,
}
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get('/swagger.json', (_request: Request, response: Response) => {
  response.setHeader('Content-Type', 'application/json')
  response.send(swaggerDocument)
})

RegisterRoutes(app)

app.use(handleError)

export const handler = serverless(app)
