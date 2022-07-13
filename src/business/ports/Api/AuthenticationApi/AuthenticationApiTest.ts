import { Token } from 'typedi';
import { mockFn, mockSubject } from '../../../../utils';
import type { IAuthenticationApi } from './IAuthenticationApi';
import { authenticationApiToken } from './IAuthenticationApi';

export class AuthenticationApiTest implements IAuthenticationApi {
  public static token: Token<AuthenticationApiTest> = authenticationApiToken;

  public onUnauthorized$ = mockSubject();

  public login = mockFn<IAuthenticationApi['login']>();

  public logout = mockFn<IAuthenticationApi['logout']>();
}

export { authenticationApiToken } from './IAuthenticationApi';
