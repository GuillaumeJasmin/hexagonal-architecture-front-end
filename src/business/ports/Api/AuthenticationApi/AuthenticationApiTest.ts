import { Container } from 'typedi';
import { mockFn, mockSubject, ServiceTest } from '../../../../utils';
import type { IAuthenticationApi } from './IAuthenticationApi';
import { authenticationApiToken } from './IAuthenticationApi';

@ServiceTest(authenticationApiToken)
export class AuthenticationApiTest implements IAuthenticationApi {
  public onUnauthorized$ = mockSubject();

  public login = mockFn<IAuthenticationApi['login']>();
  
  public logout = mockFn<IAuthenticationApi['logout']>();
}

export function resetAndGetAuthenticationApi() {
  Container.set(authenticationApiToken, new AuthenticationApiTest());

  return Container.get<AuthenticationApiTest>(authenticationApiToken);
}