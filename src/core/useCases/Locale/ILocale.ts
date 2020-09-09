import { LocaleState } from './LocaleState'
import { Observable } from 'rxjs';

export interface ILocale {
  language$: Observable<LocaleState['language']>
  setLanguage(language: LocaleState['language']): void;
}
