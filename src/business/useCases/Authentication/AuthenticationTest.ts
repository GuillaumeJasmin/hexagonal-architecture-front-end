import { Container } from 'typedi';
import { mockFn, ServiceTest } from '../../../utils';
import type { IAuthentication } from './IAuthentication';
import { authenticationToken } from './IAuthentication';
import { mockBehaviorSubject, mockSubject } from '../../../utils';

@ServiceTest(authenticationToken)
export class AuthenticationTest implements IAuthentication {
  isInitialized$ = mockBehaviorSubject<IAuthentication['isInitialized$']>();
  
  isLogging$ = mockBehaviorSubject<IAuthentication['isLogging$']>();

  isLogged$ = mockBehaviorSubject<IAuthentication['isLogged$']>();

  onLoginSucceeded$ = mockSubject<IAuthentication['onLoginSucceeded$']>();

  onLogoutSucceeded$ = mockSubject<IAuthentication['onLogoutSucceeded$']>();
  
  onUnauthorized$ = mockSubject<IAuthentication['onUnauthorized$']>();
  
  onRedirectToLogin$ = mockSubject<IAuthentication['onRedirectToLogin$']>();
  
  onRedirectToDashboard$ = mockSubject<IAuthentication['onRedirectToDashboard$']>();

  initialize = mockFn<IAuthentication['initialize']>();
  
  initAuthentication = mockFn<IAuthentication['initAuthentication']>();
  
  login = mockFn<IAuthentication['login']>();
  
  logout = mockFn<IAuthentication['logout']>();
}

export function resetAndGetAuthentication() {
  Container.set(authenticationToken, new AuthenticationTest());

  return Container.get<AuthenticationTest>(authenticationToken);
}