import { APP_ERROR, HTTP_STATUS } from '../constants'
import { i18n } from '../locales'
import type { AnyValue, ID } from '../types'

export class BaseError extends Error {
  #_details: AnyValue
  #_httpError: HTTP_STATUS = HTTP_STATUS.INTERNAL_SERVER_ERROR
  #_errorCode: number = APP_ERROR.UNKNOWN_ERROR
  #error: Error | undefined

  constructor(
    message: string,
    name: string,
    details: AnyValue = {},
    error?: Error,
  ) {
    super()
    this.name = name
    this.message = message
    this.#_details = details
    this.#error = error
  }

  get details(): AnyValue {
    return this.#_details
  }

  get httpError(): HTTP_STATUS {
    return this.#_httpError
  }

  set httpError(error: HTTP_STATUS) {
    this.#_httpError = error
  }

  set errorCode(code: number) {
    this.#_errorCode = code
  }

  get errorCode() {
    return this.#_errorCode
  }

  get error() {
    return this.#error
  }

  set error(value: Error | undefined) {
    this.#error = value
  }
}

export class ModelNotFoundError extends BaseError {
  constructor(model: string, id?: ID) {
    const message = id
      ? i18n('errors.entityWithIdNotFound', model, `id ${id}`)
      : i18n('errors.entityNotFound', model)

    super(message, 'ModelNotFoundError', {})

    this.errorCode = APP_ERROR.MODEL_NOT_FOUND
    this.httpError = HTTP_STATUS.NOT_FOUND
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message?: string) {
    const _message = message ?? i18n('errors.unauthorized')

    super(_message, 'UnauthorizedError', {})

    this.errorCode = APP_ERROR.UNAUTHORIZED
    this.httpError = HTTP_STATUS.UNAUTHORIZED
  }
}

export class UploadFileError extends BaseError {
  constructor() {
    const message = i18n('errors.upload.file')
    super(message, 'UploadFileError', {})
    this.errorCode = APP_ERROR.FILE_UPLOAD_ERROR
    this.httpError = HTTP_STATUS.INTERNAL_SERVER_ERROR
  }
}

export class NotOwnerError extends BaseError {
  constructor(model: string) {
    const message = i18n('errors.notOwner', model)

    super(message, 'NotOwnerError', {})

    this.errorCode = APP_ERROR.FORBIDDEN
    this.httpError = HTTP_STATUS.FORBIDDEN
  }
}

export class NotImplementedError extends BaseError {
  constructor() {
    const message = i18n('errors.notImplmented')

    super(message, 'NotImplementedError', {})

    this.errorCode = APP_ERROR.NOT_IMPLEMENTED
    this.httpError = HTTP_STATUS.INTERNAL_SERVER_ERROR
  }
}

export class RecordNotFoundError extends BaseError {
  constructor(message?: string) {
    const _message = message || i18n('errors.recordNotFound')

    super(_message, 'RecordNotFoundError', {})

    this.errorCode = APP_ERROR.RECORD_NOT_FOUND
    this.httpError = HTTP_STATUS.NOT_FOUND
  }
}

export class ForbiddenError extends BaseError {
  constructor() {
    const message = i18n('errors.forbidden')

    super(message, 'ForbiddenError', {})

    this.errorCode = APP_ERROR.FORBIDDEN
    this.httpError = HTTP_STATUS.FORBIDDEN
  }
}

export class AppSecurityAuthError extends BaseError {
  constructor(message: string, errors: AnyValue = {}) {
    super(message, 'AppSecurityAuthError', errors)

    this.errorCode = APP_ERROR.APP_SECURITY_AUTH_ERROR
    this.httpError = HTTP_STATUS.UNPROCESSABLE_ENTITY
  }
}

export class InitializedPoolError extends BaseError {
  constructor(message?: string) {
    const _message = i18n('errors.pool.initialization')
    super(_message, 'InitializedPoolError', message ? { error: message } : {})

    this.errorCode = APP_ERROR.FAILED_TO_INITIALIZE_POOL
    this.httpError = HTTP_STATUS.INTERNAL_SERVER_ERROR
  }
}

export class EmptyTokenError extends BaseError {
  constructor() {
    const _message = i18n('errors.emptyToken')

    super(_message, 'EmptyTokenError', {})

    this.errorCode = APP_ERROR.EMPTY_TOKEN
    this.httpError = HTTP_STATUS.UNAUTHORIZED
  }
}

export class InvalidTokenError extends BaseError {
  constructor() {
    const _message = i18n('errors.InvalidToken')

    super(_message, 'InvalidTokenError', {})

    this.errorCode = APP_ERROR.INVALID_TOKEN
    this.httpError = HTTP_STATUS.UNAUTHORIZED
  }
}
