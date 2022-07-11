import { Inject } from 'typedi';
import { createStore, select, withProps } from '@ngneat/elf';
import { withRequestsStatus, updateRequestStatus } from '@ngneat/elf-requests';
import { UseCase } from '../../core';
import type { IUserApi } from '../../services/UserApi/IUserApi';
import { userApiToken } from '../../services/UserApi/IUserApi';
import {
  ICurrentUser,
  CurrentUserState,
  currentUserToken,
} from './ICurrentUser';

const initialCurrentUserState: CurrentUserState = {
  user: null,
};

@UseCase(currentUserToken)
export class CurrentUser implements ICurrentUser {
  private store = createStore(
    { name: 'CurrentUser' },
    withProps<CurrentUserState>(initialCurrentUserState),
    withRequestsStatus<'fetchUserById'>()
  );

  public get user$() {
    return this.store.pipe(select((state) => state.user));
  }

  constructor(@Inject(userApiToken) private userApi: IUserApi) {}

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
