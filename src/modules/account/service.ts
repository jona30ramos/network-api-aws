import { AccountRepository } from '.'

export class AccountService {
  static #instance: AccountService

  #repository: AccountRepository

  constructor() {
    this.#repository = AccountRepository.getInstance()
  }

  static getInstance() {
    this.#instance ??= new AccountService()

    return this.#instance
  }

  async getById(account_id: number) {
    return await this.#repository.finById(account_id)
  }
  /* async generateNeworkByAccountId(accountId: number) {
    return await getDataFromDB(accountId)
  }   */
}
