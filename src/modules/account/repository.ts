import { BaseRepository } from '../../repository'
import { AccountModel } from './models'

export class AccountRepository extends BaseRepository {
  static #instance: AccountRepository

  static getInstance() {
    this.#instance ??= new AccountRepository()

    return this.#instance
  }

  async finById(account_id: number): Promise<AccountModel> {
    const data: AccountModel = await this.getRecords({
      sql: `
      SELECT * FROM prod_app.bi.network_analysis
      WHERE account_id IN (
        SELECT DISTINCT counterparty_account_id 
        FROM prod_app.bi.network_analysis
        WHERE account_id IN (${account_id}))`,
    })

    console.log(data)

    return data.rows[0]
  }
}
