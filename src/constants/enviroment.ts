import { URL } from 'node:url'

export class Environment {
  get debug() {
    return process.env.APP_DEBUG === 'true'
  }

  get api_key() {
    return process.env.API_KEY ?? ''
  }

  get dbConnectionParams() {
    const connectionString = process.env.DATABASE_URL
    const parameters = new URL(connectionString)

    return {
      host: parameters.hostname,
      user: parameters.username,
      password: parameters.password,
      database: parameters.pathname.slice(1),
      port: Number(parameters.port ?? 3306),
    }
  }

  get awsRegion() {
    return process.env.DEFAULT_REGION ?? ''
  }

  get awsAccessKey() {
    return process.env.PUBLIC_KEY ?? ''
  }

  get awsSecretKey() {
    return process.env.SECRET_KEY ?? ''
  }

  get awsBucket() {
    return process.env.BUCKET_NAME ?? ''
  }

  get awsCredentials() {
    return {
      accessKeyId: this.awsAccessKey,
      secretAccessKey: this.awsSecretKey,
    }
  }

  get cors_origins() {
    return process.env.CORS_ORIGINS?.split(',') ?? []
  }

  get dirSaveAnswers() {
    return process.env.DIR ?? ''
  }
}

export const environment = new Environment()
