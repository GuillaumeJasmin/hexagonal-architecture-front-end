import { IAuthentication } from './IAuthentication';
import { BehaviorSubject } from 'rxjs';

export class Authentication implements IAuthentication {
  isLogging$ = new BehaviorSubject(false);

  isLogged$ = new BehaviorSubject(false);

  onLoginSucceeded$ = new BehaviorSubject(null);
  
  onLogoutSucceeded$ = new BehaviorSubject(null);
  
  login = jest.fn<ReturnType<IAuthentication['login']>, Parameters<IAuthentication['login']>>();
}