import { map, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '../../utils/Store';
import type { IAuthUserApi } from '../../gatewayInterfaces/IAuthUserApi';
import { IAuthUser, AuthUserState } from './IAuthUser';
import { RegisterUseCase, InjectApiService } from '../../utils/decorators';

const initialState: AuthUserState = {};

@RegisterUseCase('AuthUser')
export class AuthUser extends Store<AuthUserState> implements IAuthUser {
  public user$ = this.state$.pipe(
    map((state) => {
      return state.user
    }),
    distinctUntilChanged()
  );

  @InjectApiService('AuthUser')
  private authUserApi!: IAuthUserApi;

  constructor() {
    super(initialState);
  }

  fetchUser() {
    this.authUserApi.fetchUser().then((user) => this.setState({ user }));
  }
}
