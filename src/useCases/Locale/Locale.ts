import { map } from 'rxjs/operators';
import { RegisterUseCase } from '../../utils/decorators';
import { Store } from '../../utils/Store';
import { ILocale, LocaleState } from './ILocale';

const initialState: LocaleState = {
  locale: 'fr',
};

@RegisterUseCase('Locale')
export class Locale extends Store<LocaleState> implements ILocale {
  public locale$ = this.state$.pipe(map((state) => state.locale));

  constructor() {
    super(initialState);
  }

  setLocale(locale: LocaleState['locale']) {
    this.setState({ locale });
  }
}
