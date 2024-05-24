import { createPool, PoolOptions, Pool } from 'mysql2/promise'
import { environment } from '../constants'
import { InitializedPoolError } from '../errors'
import type {
  AnyValue,
} from '../types'

let pool: Pool

export abstract class BaseRepository {
  #options: PoolOptions

  constructor() {
    this.#options = {
      ...environment.dbConnectionParams,
      waitForConnections: true,
      connectionLimit: 50,
      maxIdle: 100,
      idleTimeout: 60,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    }

    this.connect()
  }

  protected connect() {
    try {
      pool ??= createPool(this.#options)

      return pool
    } catch (error) {
      const { message } = error as Error
      throw new InitializedPoolError(message)
    }
  }

  protected async execute<T>(sql: string, ...parameters: AnyValue[]) {
    //@ts-expect-error
    return pool.query<T[]>(sql, parameters)
  }

  protected async getRecords (
    parameters: AnyValue,
  ): Promise<AnyValue> {

    const [rows] = await Promise.all([
      this.execute(parameters.sql),
    ])

    return {
      rows,
    }
  }

}
