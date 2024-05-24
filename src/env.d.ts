declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string
    APP_SECURITY_API: string
    APP_DEBUG: string
    APP_ID: string
    ORG: string
    WAF_NAME: string
  }
}
