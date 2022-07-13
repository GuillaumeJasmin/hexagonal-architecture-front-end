import { Observable } from 'rxjs';
import { UseCase, Token } from '../../../utils';

export interface IAuthentication extends UseCase {
  isLogging$: Observable<boolean>;
  isLogged$: Observable<boolean>;
  onLoginSucceeded$: Observable<unknown>;
  onLogoutSucceeded$: Observable<unknown>;
  onUnauthorized$: Observable<unknown>;
  login(data: { email: string; password: string }): Promise<void>;
  logout(): Promise<void>;
}

export const authenticationToken = new Token<IAuthentication>(
  'Authentication'
);