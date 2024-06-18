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

    if(body?.form){
    
      const nameKey: string = `${body?.form?.form_uuid}.json`
      // eslint-disable-next-line no-console
      console.log('🚀 ~ FormController ~ matches ~ nameKey:', nameKey)

      const response: any= await saveFileInS3(nameKey, body?.form)
      // eslint-disable-next-line no-console
      console.log('🚀 ~ FormController ~ matches ~ response:', response)
    
      if (response?.['$metadata']?.httpStatusCode === 200 ) 
        return { statuCode: 200, message: 'Formulario guardado correctamente' } 
      
      return { statuCode: 400, message: 'Ocurrio un incoveniente al intentar guardar el formulario.' }
    }
    return { statuCode: 400, message: 'No se pudo procesar la información' }
  }
}
