import { Inject } from 'typedi';
import { createStore, select, withProps } from '@ngneat/elf';
import { withRequestsStatus, updateRequestStatus } from '@ngneat/elf-requests';
import { Service, UseCase } from '../../../utils';
import type { IUserApi } from '../../ports/Api/UserApi/IUserApi';
import { userApiToken } from '../../ports/Api/UserApi/IUserApi';
import {
  ICurrentUser,
  CurrentUserState,
  currentUserToken,
} from './ICurrentUser';

@Service(currentUserToken)
export class CurrentUser extends UseCase implements ICurrentUser {
  @Inject(userApiToken) private userApi!: IUserApi;

  private store = createStore(
    { name: 'CurrentUser' },
    withProps<CurrentUserState>({
      user: null,
    }),
    withRequestsStatus<'fetchUserById'>()
  );

  public get user$() {
    return this.store.pipe(select((state) => state.user));
  }

  public async fetchUserById(data: { userId: string }) {
    try {
      this.store.update(updateRequestStatus('fetchUserById', 'pending'));
      const user = await this.userApi.fetchUserById(data);
      this.store.update(
        updateRequestStatus('fetchUserById', 'success'),
        (prevState) => ({ ...prevState, user })
      );
    } catch (error: unknown) {
      throw new Error('error');
    }
  }

  public async setUser(user: CurrentUserState['user']) {
    this.store.update((prevState) => ({ ...prevState, user }));
  }
}
