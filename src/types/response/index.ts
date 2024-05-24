import type { AnyValue, AnyObject } from '..'

export interface SingleResponse<T = AnyValue> {
  data: T
}

export interface Meta extends AnyObject {}

export interface Response<T = AnyValue> {
  data: T | T[]
  meta: Meta
}

export interface ErrorResponse {
  error: {
    message: string
    code: number
    type: string
    details?: AnyValue
    stack?: AnyValue
  }
}
