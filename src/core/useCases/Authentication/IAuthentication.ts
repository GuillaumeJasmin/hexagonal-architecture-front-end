import { Observable } from 'rxjs';

export interface AuthenticationState {
  isLogging: boolean;
  loginError: string | null;
}

export interface IAuthentication {
  isLogging$: Observable<boolean>;
  isLogged$: Observable<boolean>;
  onLoginSucceeded$: Observable<unknown>;
  onLogoutSucceeded$: Observable<unknown>;
  login(data: { email: string; password: string }): Promise<void>;
}
