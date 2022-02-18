import { Store } from '../../utils/Store';
import { IAuthentication, AuthenticationState } from './IAuthentication';
import { RegisterUseCase } from '../tools';
import { BehaviorSubject } from 'rxjs';

@RegisterUseCase('Authentication')
export class Authentication extends Store<AuthenticationState> implements IAuthentication {
  isLogging$ = new BehaviorSubject(false);

  isLogged$ = new BehaviorSubject(false);

  onLoginSucceeded$ = new BehaviorSubject(null);
  
  onLogoutSucceeded$ = new BehaviorSubject(null);
  
  login = jest.fn<ReturnType<IAuthentication['login']>, Parameters<IAuthentication['login']>>();
}