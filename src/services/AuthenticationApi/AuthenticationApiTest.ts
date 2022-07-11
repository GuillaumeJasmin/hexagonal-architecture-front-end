import { Container } from 'typedi';
import { UseCaseTest } from '../../core';
import type { IAuthenticationApi } from './IAuthenticationApi';
import { authenticationApiToken } from './IAuthenticationApi';

@UseCaseTest(authenticationApiToken)
export class AuthenticationApiTest implements IAuthenticationApi {
  public login = jest.fn<
    ReturnType<IAuthenticationApi['login']>,
    Parameters<IAuthenticationApi['login']>
  >();

  public logout = jest.fn<
    ReturnType<IAuthenticationApi['logout']>,
    Parameters<IAuthenticationApi['logout']>
  >();
}

export function resetAndGetAuthenticationApi() {
  Container.set(authenticationApiToken, new AuthenticationApiTest());

  return Container.get<AuthenticationApiTest>(authenticationApiToken);
}
