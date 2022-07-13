import { Inject } from 'typedi';
import { filter, map, skip, concatWith } from 'rxjs/operators';
import { createStore, withProps } from '@ngneat/elf';
import { Service } from '../../../utils';
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
import { combineLatest, Subject } from 'rxjs';

export interface AuthenticationState {
  loginError: string | null;
}

const initialAuthenticationState: AuthenticationState = {
  loginError: null,
};

@Service(authenticationToken)
export class Authentication implements IAuthentication {
  private store = createStore(
    { name: 'Authentication' },
    withProps<AuthenticationState>(initialAuthenticationState),
    withRequestsStatus<'initialized' | 'login' | 'logout'>()
  );

  public isInitialized$ = this.store.pipe(
    selectRequestStatus('initialized'),
    map((status) => status.value === 'success')
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

  public onRedirectToLogin$ = new Subject<void>();

  public onRedirectToDashboard$ = new Subject<void>();

  public get onUnauthorized$() {
    return this.authenticationApi.onUnauthorized$;
  }

  @Inject(authenticationApiToken)
  private authenticationApi!: IAuthenticationApi;

  @Inject(currentUserToken)
  private currentUser!: ICurrentUser;

  @Inject(tokenStorageToken)
  private tokenStorage!: ITokenStorage;

  public async initialize() {
    this.onUnauthorized$.subscribe(() => {
      this.onRedirectToLogin$.next();
    });
    
    this.onLogoutSucceeded$.subscribe(() => {
      this.onRedirectToLogin$.next();
    });
  }

  public async initAuthentication() {
    const userId = this.tokenStorage.getToken();
    if (userId) {
      this.store.update(updateRequestStatus('initialized', 'pending'));
      await this.currentUser.fetchUserById({ userId });
      this.onRedirectToDashboard$.next();
    } else {
      this.onRedirectToLogin$.next();
    }

    this.store.update(updateRequestStatus('initialized', 'success'));
  }

  public async login(data: { email: string; password: string }) {
    try {
      this.store.update(updateRequestStatus('login', 'pending'));
      const { userId } = await this.authenticationApi.login(data);
      this.tokenStorage.setToken(userId);
      await this.currentUser.fetchUserById({ userId });
      this.store.update(updateRequestStatus('login', 'success'));
    } catch (error: unknown) {
      console.log('ERROR', error);
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
