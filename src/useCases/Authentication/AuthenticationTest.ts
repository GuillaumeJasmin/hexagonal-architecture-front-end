import { RegisterUseCase, getUseCase } from '../../hexactInstance';
import { IAuthentication } from './IAuthentication';
import { BehaviorSubject } from 'rxjs';

@RegisterUseCase('Authentication')
export class AuthenticationTest implements IAuthentication {
  isLogging$ = new BehaviorSubject(false);

  isLogged$ = new BehaviorSubject(false);

  onLoginSucceeded$ = new BehaviorSubject(null);
  
  onLogoutSucceeded$ = new BehaviorSubject(null);
  
  login = jest.fn<ReturnType<IAuthentication['login']>, Parameters<IAuthentication['login']>>();
  
  logout = jest.fn<ReturnType<IAuthentication['logout']>, Parameters<IAuthentication['logout']>>();
}

export const authentication = getUseCase('Authentication') as AuthenticationTest;