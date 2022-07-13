import { Inject } from 'typedi';
import { filter, map, skip } from 'rxjs/operators';
import { createStore, withProps } from '@ngneat/elf';
import { Service, UseCase } from '../../../utils';
import type { IAuthenticationApi } from '../../ports/Api/AuthenticationApi/IAuthenticationApi';
import { authenticationApiToken } from '../../ports/Api/AuthenticationApi/IAuthenticationApi';
import { IAuthentication, authenticationToken } from './IAuthentication';
import type { ICurrentUser } from '../CurrentUser/ICurrentUser';
import { currentUserToken } from '../CurrentUser/ICurrentUser';
import {
  updateRequestStatus,
  withRequestsStatus,
  selectRequestStatus,
  selectIsRequestPending,
} from '@ngneat/elf-requests';
import { tokenStorageToken } from '../../ports/Storage/ITokenStorage';
import type { ITokenStorage } from '../../ports/Storage/ITokenStorage';

export interface AuthenticationState {
  loginError: string | null;
}

@Service(authenticationToken)
export class Authentication extends UseCase implements IAuthentication {
  @Inject(authenticationApiToken)
  private authenticationApi!: IAuthenticationApi;

  @Inject(currentUserToken)
  private currentUser!: ICurrentUser;

  @Inject(tokenStorageToken)
  private tokenStorage!: ITokenStorage;

  private store = createStore(
    { name: 'Authentication' },
    withProps<AuthenticationState>({
      loginError: null,
    }),
    withRequestsStatus<'initialized' | 'login' | 'logout'>()
  );

  public isLogging$ = this.store.pipe(selectIsRequestPending('login'));

  public get isLogged$() {
    return this.currentUser.user$.pipe(
      map((user) => !!user),
      filter((isLogged) => isLogged)
    );
  }

  public onLoginSucceeded$ = this.store.pipe(
    selectRequestStatus('login'),
    skip(1),
    filter((status) => status.value === 'success')
  );

  public onLogoutSucceeded$ = this.store.pipe(
    selectRequestStatus('logout'),
    skip(1),
    filter((status) => status.value === 'success')
  );

  public get onUnauthorized$() {
    return this.authenticationApi.onUnauthorized$;
  }

  public async initialize() {
    super.initialize();

    this.onUnauthorized$.subscribe(() => {
      // notification about unauthorized error
    });
  }

  public async login(data: { email: string; password: string }) {
    try {
      this.store.update(updateRequestStatus('login', 'pending'));
      const { userId } = await this.authenticationApi.login(data);
      this.tokenStorage.setToken(userId);
      await this.currentUser.fetchUserById({ userId });
      this.store.update(updateRequestStatus('login', 'success'));
    } catch (error: unknown) {
      this.store.update(updateRequestStatus('login', 'error', error));
    }
  }

  public async logout() {
    try {
      this.store.update(updateRequestStatus('logout', 'pending'));
      await this.authenticationApi.logout();
      this.tokenStorage.removeToken();
      this.store.update(updateRequestStatus('logout', 'success'));
    } catch (error: unknown) {
      this.store.update(updateRequestStatus('logout', 'error', error));
    }
  }
}
