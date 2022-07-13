import { Observable } from 'rxjs';
import { Token } from 'typedi';

export interface IAuthentication {
  isInitialized$: Observable<boolean>;
  isLogging$: Observable<boolean>;
  isLogged$: Observable<boolean>;
  onLoginSucceeded$: Observable<unknown>;
  onLogoutSucceeded$: Observable<unknown>;
  onUnauthorized$: Observable<unknown>;
  onRedirectToLogin$: Observable<unknown>;
  onRedirectToDashboard$: Observable<unknown>;
  initAuthentication(): Promise<void>;
  initialize(): Promise<void>;
  login(data: { email: string; password: string }): Promise<void>;
  logout(): Promise<void>;
}

export const authenticationToken = new Token<IAuthentication>('Authentication');