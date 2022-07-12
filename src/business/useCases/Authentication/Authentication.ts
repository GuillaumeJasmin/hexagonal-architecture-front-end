import { Inject } from 'typedi';
import { filter, map, skip } from 'rxjs/operators';
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

export interface AuthenticationState {
  isLogging: boolean;
  loginError: string | null;
  user: {
    name: string;
    email: string;
  } | null;
}

const initialAuthenticationState: AuthenticationState = {
  isLogging: false,
  loginError: null,
  user: null,
};

@Service(authenticationToken)
export class Authentication implements IAuthentication {
  private store = createStore(
    { name: 'Authentication' },
    withProps<AuthenticationState>(initialAuthenticationState),
    withRequestsStatus<'login' | 'logout'>()
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

  @Inject(authenticationApiToken)
  private authenticationApi!: IAuthenticationApi;

  @Inject(currentUserToken)
  private currentUser!: ICurrentUser;

  public initialize() {
    // ...
  }

  public async login(data: { email: string; password: string }) {
    try {
      this.store.update(updateRequestStatus('login', 'pending'));
      const { userId } = await this.authenticationApi.login(data);
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
      this.store.update(updateRequestStatus('logout', 'success'));
    } catch (error: unknown) {
      this.store.update(updateRequestStatus('logout', 'error', error));
    }
  }
}
