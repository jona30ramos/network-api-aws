import {
  Controller,
  Post,
  Route,
  Middlewares,
  Security,
  Body,
} from 'tsoa'
import { authorize } from '../../middlewares'
import { AnyValue } from '../../types'
import { saveFileInS3 } from '../../utils/s3.helper'

@Route('form')
export class FormController extends Controller {


  @Post('/save-form/')
  @Security('api_key')
  @Middlewares(authorize)
  public async matches(@Body() body: any): Promise<AnyValue> {
    // eslint-disable-next-line no-console
    console.log('🚀 ~ FormController ~ matches ~ body:', body)

    if (!body?.form) 
      return { statusCode: 400, message: 'No se pudo procesar la información.' }
    

    const { form_uuid } = body.form
    const nameKey: string = `${form_uuid}.json`
    // eslint-disable-next-line no-console
    console.log('🚀 ~ FormController ~ matches ~ nameKey:', nameKey)

    try {
      const response: any = await saveFileInS3(nameKey, body.form)
      // eslint-disable-next-line no-console
      console.log('🚀 ~ FormController ~ matches ~ response:', response)

      return response?.['$metadata']?.httpStatusCode === 200 ? { statusCode: 200, message: 'Formulario guardado correctamente' } : { statusCode: 400, message: 'Ocurrió un inconveniente al intentar guardar el formulario.' }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('🚀 ~ FormController ~ matches ~ error:', error)
      return { statusCode: 500, message: 'Error interno del servidor al guardar el formulario.' }
    }
  }
}
