import { map, distinctUntilChanged } from 'rxjs/operators'
import { Store } from '../../utils/Store'
import { ILocale } from './ILocale'
import { LocaleState } from './LocaleState'

const initialState: LocaleState = {
  language: 'fr'
}

export class Locale extends Store<LocaleState> implements ILocale {
  language$ = this.state$.pipe(map(state => state.language), distinctUntilChanged())

  constructor() {
    super(initialState)
  }

  setLanguage(language: LocaleState['language']) {
    this.setState({ language })
  };
}
