import { Container } from 'typedi';
import { mockFn, ServiceTest } from '../../../utils';
import type { IAuthentication } from './IAuthentication';
import { authenticationToken } from './IAuthentication';
import { mockBehaviorSubject, mockSubject } from '../../../utils';

@ServiceTest(authenticationToken)
export class AuthenticationTest implements IAuthentication {
  isLogging$ = mockBehaviorSubject<IAuthentication['isLogging$']>();

  isLogged$ = mockBehaviorSubject<IAuthentication['isLogged$']>();

  onLoginSucceeded$ = mockSubject<IAuthentication['onLoginSucceeded$']>();

  onLogoutSucceeded$ = mockSubject<IAuthentication['onLogoutSucceeded$']>();

  onUnauthorized$ = mockSubject<IAuthentication['onUnauthorized$']>();

  initialize = mockFn<IAuthentication['initialize']>();

  login = mockFn<IAuthentication['login']>();

  logout = mockFn<IAuthentication['logout']>();
}

export function getAuthentication() {
  return Container.get<AuthenticationTest>(authenticationToken);
}
