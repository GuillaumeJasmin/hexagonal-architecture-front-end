import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Store } from '../../utils/Store';
import type { IAuthenticationApi } from '../../../services/AuthenticationApi/IAuthenticationApi';
import { IAuthentication, AuthenticationState } from './IAuthentication';
import { RegisterUseCase, InjectUseCase } from '../tools';
import { InjectService } from '../../../services/tools';
import type { ICurrentUser } from '../CurrentUser/ICurrentUser';

const initialAuthenticationState: AuthenticationState = {
  isLogging: false,
  loginError: null,
};

@RegisterUseCase('Authentication')
export class Authentication
  extends Store<AuthenticationState>
  implements IAuthentication
{
  @InjectUseCase('CurrentUser')
  private currentUser!: ICurrentUser;

  @InjectService('Authentication')
  private authenticationApi!: IAuthenticationApi;

  public get isLogged$() {
    return this.currentUser.user$.pipe(map((user) => !!user));
  }

  public get isLogging$() {
    return this.select((state) => state.isLogging);
  }

  public get onLoginSucceeded$() {
    return this.isLogged$.pipe(
      filter((isLogged) => isLogged),
      distinctUntilChanged()
    );
  }

  public get onLogoutSucceeded$() {
    return this.isLogged$.pipe(
      filter((isLogged) => !isLogged),
      distinctUntilChanged()
    );
  }

  constructor() {
    super(initialAuthenticationState);
  }

  public async login(data: { email: string; password: string }) {
    try {
      this.setState({ isLogging: true });
      const { userId } = await this.authenticationApi.login(data);
      await this.currentUser.fetchUserById({ userId });
    } catch (error: unknown) {
      this.setState({ loginError: 'Error' });
    } finally {
      this.setState({ isLogging: false });
    }
  }
}
