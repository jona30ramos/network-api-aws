import { inspect } from 'util'
import { AnyObject, AnyValue } from '../types'

export const isObject = <T = AnyObject>(value: unknown): value is T => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isEmptyObject<T>(object: T): boolean {
  if (!object) return true
  return Object.entries(object).length === 0
}

export const getObjectProperty = (object: AnyObject, path: string): unknown => {
  const parts = path.split('.')
  return parts.reduce((object, key) => object?.[key] as AnyValue, object)
}

export function print(object: AnyValue) {
  // eslint-disable-next-line no-console
  console.log(inspect(object, false, null, true))
}
