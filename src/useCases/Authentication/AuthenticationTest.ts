import { Container } from 'typedi';
import { UseCaseTest } from '../../core';
import type { IAuthentication } from './IAuthentication';
import { authenticationToken } from './IAuthentication';
import { mockBehaviorSubject } from '../../core/RxJSMock';
import { mockSubject } from '../../core/RxJSMock';

@UseCaseTest(authenticationToken)
export class AuthenticationTest implements IAuthentication {
  isLogging$ = mockBehaviorSubject<IAuthentication['isLogging$']>('isLogging');

  isLogged$ = mockBehaviorSubject<IAuthentication['isLogged$']>('isLogged');

  onLoginSucceeded$ = mockSubject<IAuthentication['onLoginSucceeded$']>();

  onLogoutSucceeded$ = mockSubject<IAuthentication['onLogoutSucceeded$']>();

  login = jest.fn<
    ReturnType<IAuthentication['login']>,
    Parameters<IAuthentication['login']>
  >();

  logout = jest.fn<
    ReturnType<IAuthentication['logout']>,
    Parameters<IAuthentication['logout']>
  >();
}

export function resetAndGetAuthentication() {
  Container.set(authenticationToken, new AuthenticationTest());

  return Container.get<AuthenticationTest>(authenticationToken);
}
