import { NextFunction, Request, Response } from 'express'
import { environment } from '../constants'
import { EmptyTokenError, InvalidTokenError } from '../errors'

export function authorize(
  request: Request,
  _response: Response,
  next: NextFunction,
) {
  const authHeader = request.header('X-api-key')

  if (authHeader === undefined) throw new EmptyTokenError()

  if (authHeader !== environment.api_key) throw new InvalidTokenError()

  next()
}
