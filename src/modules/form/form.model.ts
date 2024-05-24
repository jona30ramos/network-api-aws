import { RowDataPacket } from 'mysql2'
import { AnyValue } from '../../types'

export interface dueDiligenceTypeResponse {
  type_response_id: number
  descr: string
}

export interface dueDiligenceQuestion {
  section_id: number
  question_id: number
  n_index: number
  name_question: string
  description: string
  required: boolean
  type_response: dueDiligenceTypeResponse
  responses: string | null
  dependent: string | null
  show: boolean
  propertiesApi: AnyValue
}

export interface dueDiligenceForm extends RowDataPacket {
  section_id: number
  name_section: string
  show: boolean
  questions: dueDiligenceQuestion[]
}

export interface Form {
  data: dueDiligenceForm | AnyValue
}
