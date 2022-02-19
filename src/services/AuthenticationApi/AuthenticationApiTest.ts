import { getService, RegisterService } from '../../hexactInstance';
import type { IAuthenticationApi } from './IAuthenticationApi';

@RegisterService('Authentication')
export class AuthenticationApiTest implements IAuthenticationApi {
  login = jest.fn<
    ReturnType<IAuthenticationApi['login']>,
    Parameters<IAuthenticationApi['login']>
  >();
}

export const authenticationApi = getService('Authentication') as AuthenticationApiTest;
