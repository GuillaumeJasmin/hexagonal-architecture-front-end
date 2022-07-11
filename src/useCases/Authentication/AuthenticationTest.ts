import { Container } from 'typedi';
import { mockFn } from '../../core';
import type { IAuthentication } from './IAuthentication';
import { authenticationToken } from './IAuthentication';
import { mockBehaviorSubject, mockSubject } from '../../core';


export class AuthenticationTest implements IAuthentication {
  isLogging$ = mockBehaviorSubject<IAuthentication['isLogging$']>('isLogging');

  isLogged$ = mockBehaviorSubject<IAuthentication['isLogged$']>('isLogged');

  onLoginSucceeded$ = mockSubject<IAuthentication['onLoginSucceeded$']>();

  onLogoutSucceeded$ = mockSubject<IAuthentication['onLogoutSucceeded$']>();
  
  onUnauthorized$ = mockSubject<IAuthentication['onUnauthorized$']>();

  login = mockFn<IAuthentication['login']>();
  
  logout = mockFn<IAuthentication['logout']>();
}

export function resetAndGetAuthentication() {
  Container.set(authenticationToken, new AuthenticationTest());

  return Container.get<AuthenticationTest>(authenticationToken);
}