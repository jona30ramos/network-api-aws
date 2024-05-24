import { format } from 'util'
import { AnyObject, AnyValue } from '../types'
import { getObjectProperty } from '../utils/object'
import { en } from './en'

export type Locales = {
  en: AnyObject
}

const locale: keyof Locales = 'en'

export const locales: Locales = { en }

/**
 * Translates a given key into the corresponding message in the current locale.
 *
 * @param {string} key - The key to be translated.
 * @param {...AnyValue[]} parameters - Optional parameters to be inserted into the translated message.
 * @returns {string} - The translated message.
 * @throws {Error} - If the key is not found in the locale or if the locale is not set.
 */
export const i18n = (key: string, ...parameters: AnyValue[]): string => {
  const message = getObjectProperty(locales[locale], key) as string

  if (parameters.length > 0)
    return format(message, ...parameters).replaceAll('--', '')

  return message
}

/**
 * Retrieves a translated value from the locales object based on the provided key.
 *
 * @param {string} key - The key used to retrieve the translated value from the locales object.
 * @returns {T} - The translated value retrieved from the locales object.
 * @throws {Error} - If the key is not found in the locales object.
 * @template T - The type of the translated value to be returned.
 */
export const localeValue = <T = AnyValue>(key: string): T => {
  return getObjectProperty(locales[locale], key) as T
}
