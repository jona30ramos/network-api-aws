const serverless = require('serverless-http')
const express = require('express')
const app = express()

app.get('/', (_request, response, _next) => {
  return response.status(200).json({
    message: 'Hello from root!',
  })
})

app.get('/path', (_request, response, _next) => {
  return response.status(200).json({
    message: 'Hello from path!',
  })
})

app.use((_request, response, _next) => {
  return response.status(404).json({
    error: 'Not Found',
  })
})

module.exports.handler = serverless(app)
