/* eslint-disable node/no-unpublished-import */

import serverless from 'serverless-http'
import express, { Request, Response } from 'express'
import * as swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import * as swaggerDocument from '../build/swagger.json'
import { RegisterRoutes } from '../build/routes'
import { handleError } from './middlewares'
import { environment } from './constants'

const app = express()

/* const main = async () => {
  await clientSQL.connect();
}
main() */
const corsOptions = {
  origin: environment.cors_origins,
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
