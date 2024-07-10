import { RowDataPacket } from 'mysql2'
import { AnyValue } from '../../types'

export interface AccountModel extends RowDataPacket {
  account_id: number
  name: string
}

export interface AccountReponse {
  data: AccountModel | AnyValue
}
