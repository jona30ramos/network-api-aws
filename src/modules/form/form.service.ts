import { FormRepository } from '.'

export class FormService {
  static #instance: FormService

  #repository: FormRepository

  constructor() {
    this.#repository = FormRepository.getInstance()
  }

  static getInstance() {
    this.#instance ??= new FormService()

    return this.#instance
  }

  async getFormById(parameters: any) {
    return await this.#repository.getFormById(parameters)
  }

  async getAnnexes() {
    return await this.#repository.getAnnexes()
  }
}
