import { RegisterService } from '../tools';
import type { IAuthenticationApi } from './IAuthenticationApi';

@RegisterService('Authentication')
export class AuthenticationApiTest implements IAuthenticationApi {
  login = jest.fn<ReturnType<IAuthenticationApi['login']>, Parameters<IAuthenticationApi['login']>>();
}
