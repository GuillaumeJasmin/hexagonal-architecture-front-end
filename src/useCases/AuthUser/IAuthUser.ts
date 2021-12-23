import { Observable, ObservedValueOf } from 'rxjs'
import { ILocale } from '../Locale'

export interface AuthUserState {
  user: null | {
    name: string;
    email: string;
    defaultLanguage: ObservedValueOf<ILocale['locale$']>
  };
}

export interface IAuthUser {
  user$: Observable<AuthUserState['user']>
  locale$: Observable<string>
  fetchUser(): void;
}
