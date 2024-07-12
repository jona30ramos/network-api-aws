import { Client, Pool } from 'pg'
import { environment } from '../../constants'

export const clientSQL = new Client({
  connectionString: environment.databaseUrl,
  statement_timeout: 10000,
})

export const pool = new Pool({
  connectionString: environment.databaseUrl,
  statement_timeout: 10000,
  max: 1000000000000000,
  allowExitOnIdle: true,
})
