import { mockFn } from '../../../utils';
import type { IAuthentication } from './IAuthentication';
import { mockBehaviorSubject, mockSubject } from '../../../utils';

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

export { authenticationToken } from './IAuthentication';