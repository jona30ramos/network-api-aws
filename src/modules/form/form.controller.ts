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

    if(body?.form){
    
      const nameKey: string = `${body?.form?.form_uuid}.json`

      const response: any= await saveFileInS3(nameKey, body?.form)
    
      if(response?.['$metadata']?.httpStatusCode === 200 )
        return { data: { statuCode: 200, message: 'Formulario guardado correctamente' } }
      return { data: { statuCode: 400, message: 'Ocurrio un incoveniente al intentar guardar el formulario.' } }
    }
    return { data: { statuCode: 400, message: 'No se pudo procesar la información' } }
  }
}
