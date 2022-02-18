import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Store } from '../../utils/Store';
import type { IAuthenticationApi } from '../../../services/AuthenticationApi/IAuthenticationApi';
import { IAuthentication, AuthenticationState } from './IAuthentication';
import { RegisterUseCase, InjectUseCase } from '../tools';
import { InjectService } from '../../../services/tools';
import type { ICurrentUser } from '../CurrentUser/ICurrentUser';

const initialAuthenticationState: AuthenticationState = {
  isLogging: false,
};

@RegisterUseCase('Authentication')
export class Authentication
  extends Store<AuthenticationState>
  implements IAuthentication
{
  // @InjectService('Authentication')
  // protected authenticationApi!: IAuthenticationApi;

  // @InjectUseCase('CurrentUser')
  // protected currentUser!: ICurrentUser;

  public isLogged$ = this.currentUser?.user$.pipe(map((user) => !!user));

  public isLogging$ = this.select(state => state.isLogging);

  public onLoginSucceeded$ = this.isLogged$.pipe(
    filter((isLogged) => isLogged),
    distinctUntilChanged()
  );

  public onLogoutSucceeded$ = this.isLogged$.pipe(
    filter((isLogged) => !isLogged),
    distinctUntilChanged()
  );

  constructor(
    @InjectUseCase('CurrentUser') public currentUser: ICurrentUser,
    @InjectService('Authentication') public authenticationApi: IAuthenticationApi,
  ) {
    super(initialAuthenticationState);
  }

  public async login(data: { email: string; password: string }) {
    try {
      this.setState({ isLogging: true });
      const { userId } = await this.authenticationApi.login(data);
      await this.currentUser.fetchUserById({ userId });
    } catch (error: unknown) {
      throw new Error('Login failed');
    } finally {
      this.setState({ isLogging: false });
    }
  }
}
