import { Container, Token } from 'typedi';
import { mockFn, mockSubject, ServiceTest } from '../../../../utils';
import type { IAuthenticationApi } from './IAuthenticationApi';
import { authenticationApiToken } from './IAuthenticationApi';

export { authenticationApiToken } from './IAuthenticationApi';

@ServiceTest(authenticationApiToken)
export class AuthenticationApiTest implements IAuthenticationApi {
  public static token: Token<AuthenticationApiTest> = authenticationApiToken;

  public onUnauthorized$ = mockSubject();

  public login = mockFn<IAuthenticationApi['login']>();

  public logout = mockFn<IAuthenticationApi['logout']>();
}

export function getAuthenticationApiTest() {
  return Container.get<AuthenticationApiTest>(authenticationApiToken);
}
