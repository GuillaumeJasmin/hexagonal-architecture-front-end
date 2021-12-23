import { Observable, ObservedValueOf } from 'rxjs'
import { ILocale } from '../Locale'

export interface AuthUserState {
  user?: {
    name: string;
    email: string;
    defaultLanguage: ObservedValueOf<ILocale['locale$']>
  };
}

export interface IAuthUser {
  user$: Observable<AuthUserState['user']>
  fetchUser(): void;
}
