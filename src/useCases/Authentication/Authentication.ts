import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { Store } from '../../hexact';
import { RegisterUseCase, InjectService, InjectUseCase } from '../../hexactInstance';
import type { IAuthenticationApi } from '../../services/AuthenticationApi/IAuthenticationApi';
import { IAuthentication, AuthenticationState } from './IAuthentication';
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
    return this.currentUser.user$.pipe(
      map((user) => !!user),
      distinctUntilChanged()
    );
  }

  public get isLogging$() {
    return this.select((state) => state.isLogging);
  }

  public get onLoginSucceeded$() {
    return this.isLogged$.pipe(
      filter((isLogged) => isLogged),
      distinctUntilChanged(),
      tap(() => console.log('onLoginSucceeded$')),
    );
  }

  public get onLogoutSucceeded$() {
    return this.isLogged$.pipe(
      filter((isLogged) => !isLogged),
      distinctUntilChanged(),
      tap(() => console.log('onLogoutSucceeded$')),
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

  public async logout() {
    this.currentUser.setUser(null);
  }
}