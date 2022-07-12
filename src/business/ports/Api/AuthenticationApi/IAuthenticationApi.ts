import { Observable } from 'rxjs';
import { Token } from 'typedi';

export interface IAuthenticationApi {
  onUnauthorized$: Observable<unknown>;
  login(data: { email: string; password: string }): Promise<{ userId: string }>;
  logout(): Promise<void>;
}

export const authenticationApiToken = new Token<IAuthenticationApi>(
  'AuthenticationApi'
);
