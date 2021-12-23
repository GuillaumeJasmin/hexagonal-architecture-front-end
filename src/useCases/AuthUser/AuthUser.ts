import { map, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '../../utils/Store';
import type { IAuthUserApi } from '../../gatewayInterfaces/IAuthUserApi';
import { IAuthUser, AuthUserState } from './IAuthUser';
import type { ILocale } from '../Locale/ILocale';
import {
  RegisterUseCase,
  InjectApiService,
  InjectUseCase,
} from '../../utils/decorators';
import { getBehaviorSubjectValue } from '../../utils/getBehaviorSubjectValue';

const initialState: AuthUserState = {
  user: null,
};

@RegisterUseCase('AuthUser')
export class AuthUser extends Store<AuthUserState> implements IAuthUser {
  public user$ = this.state$.pipe(map((state) => state.user));

  public locale$ = this.locale?.locale$;

  constructor(
    @InjectUseCase('Locale') private locale: ILocale,
    @InjectApiService('AuthUser') private authUserApi: IAuthUserApi
  ) {
    super(initialState);
  }

  fetchUser() {
    this.authUserApi.fetchUser().then((user) => this.setState({ user }));

    console.log(getBehaviorSubjectValue(this.user$));
  }
}
