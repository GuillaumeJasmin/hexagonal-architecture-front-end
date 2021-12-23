import { Observable } from 'rxjs'

export interface LocaleState {
  locale: 'fr' | 'en';
}

export interface ILocale {
  locale$: Observable<LocaleState['locale']>
  setLocale(locale: LocaleState['locale']): void;
}
