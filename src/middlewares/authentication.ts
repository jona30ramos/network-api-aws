import { Request } from 'express'
import { NotImplementedError } from '../errors'

export async function expressAuthentication(
  _request: Request,
  securityName: string,
  _scopes?: string[],
): Promise<any> {
  if (securityName === 'api_key') return true

  throw new NotImplementedError()
}
