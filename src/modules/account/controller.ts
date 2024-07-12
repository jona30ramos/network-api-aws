import { Controller, Post, Route, Middlewares, Security, Body } from 'tsoa'
import { authorize } from '../../middlewares'
import { AnyValue } from '../../types'
import { getDataFromDB } from './service-network'

interface BodyRequest {
  accountId: number
}

// eslint-disable-next-line no-console
@Route('account')
export class AccountController extends Controller {
  @Post('find')
  @Security('api_key')
  @Middlewares(authorize)
  public async find(@Body() body: BodyRequest): Promise<AnyValue> {
    const accountId = body.accountId ?? null
    if (!accountId) {
      return { accountId, message: 'AccountId es null' }
    }
    return { accountId }
  }

  @Post('connected')
  @Security('api_key')
  @Middlewares(authorize)
  public async isConnected(): Promise<AnyValue> {
    console.log('Is Connected to Account Service...')
    return { message: 'You are Connected the Account Service!' }
  }

  @Post('network')
  @Security('api_key')
  @Middlewares(authorize)
  public async findNetwork(@Body() body: BodyRequest): Promise<any> {
    const accountId = body.accountId ?? null
    if (!accountId) {
      return { message: 'Account ID es nulo' }
    }
    try {
      //return await getDataFromDB(accountId as number)
      return await getDataFromDB(accountId)
    } catch (error) {
      return { message: 'Error en conexion' }
    }
  }
}
