import { BaseRepository } from '../../repository'
import * as models from './form.model'

export class FormRepository extends BaseRepository {
  static #instance: FormRepository

  static getInstance() {
    this.#instance ??= new FormRepository()

    return this.#instance
  }

  async getFormById(parameters: any = {}): Promise<models.dueDiligenceForm> {
    const table = 'hub_control_list.dd_form'

    const data: models.dueDiligenceForm = await this.getRecords({
      sql: `SELECT form_id, due_diligence_id, template FROM ${table} 
            WHERE uuid = '${parameters.form_uuid}' AND is_complete = 0;`,
    })

    return data.rows[0]
  }

  async getAnnexes(): Promise<any> {
    const table = 'hub_control_list.dd_annexes'

    const data: models.dueDiligenceForm = await this.getRecords({
      sql: `SELECT annexe_id, annexe_name, annexe_descr FROM ${table} `,
    })

    return data.rows[0]
  }
}
