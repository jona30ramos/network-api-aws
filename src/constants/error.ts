export enum APP_ERROR {
  UNKNOWN_ERROR = 1,
  INVALID_PAYLOAD = 2,
  UNAUTHORIZED = 3,
  MODEL_NOT_FOUND = 4,
  SEQUENCE_CONFLICT = 5,
  FILE_UPLOAD_ERROR = 6,
  FORBIDDEN = 7,
  NOT_IMPLEMENTED = 8,
  RECORD_NOT_FOUND = 9,
  RELATED_ENTITIES = 10,
  EMPTY_TOKEN = 11,
  INVALID_TOKEN = 12,

  FAILED_TO_INITIALIZE_POOL = 20,

  APP_SECURITY_AUTH_ERROR = 40,
}
