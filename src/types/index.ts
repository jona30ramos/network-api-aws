export * from './response'

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyValue = any

export type AnyObject<
  Key extends string | number | symbol = string,
  Value = unknown,
> = Record<Key, Value>

export type StringObject = AnyObject<string, string>

export type ID = number | string
