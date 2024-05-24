import { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'yup'
import { ValidateError } from 'tsoa'
import { BaseError } from '../errors'
import { APP_ERROR, HTTP_STATUS, environment } from '../constants'
import type { ErrorResponse } from '../types'

export function handleError(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  const { name, message } = error as Error

  let status = HTTP_STATUS.INTERNAL_SERVER_ERROR
  const _response: ErrorResponse = {
    error: {
      message,
      code: APP_ERROR.UNKNOWN_ERROR,
      type: name,
    },
  }

  if (error instanceof BaseError) {
    status = error.httpError
    _response.error.code = error.errorCode
    _response.error.details = error.details
  } else if (error instanceof ValidationError) {
    status = HTTP_STATUS.UNPROCESSABLE_ENTITY
    _response.error.code = APP_ERROR.INVALID_PAYLOAD
    _response.error.details = error.errors
  } else if (error instanceof ValidateError) {
    status = HTTP_STATUS.UNPROCESSABLE_ENTITY
    _response.error.code = APP_ERROR.INVALID_PAYLOAD
    _response.error.details = error.fields
  }

  if (environment.debug) _response.error.stack = error.stack?.split('\n')

  response.status(status).json(_response)
}
