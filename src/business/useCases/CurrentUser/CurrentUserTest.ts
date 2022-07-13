import { mockFn } from '../../../utils';
import type { ICurrentUser } from './ICurrentUser';
import { mockBehaviorSubject } from '../../../utils';

export class CurrentUserTest implements ICurrentUser {
  user$ = mockBehaviorSubject<ICurrentUser['user$']>('User');

  initialize = mockFn<ICurrentUser['initialize']>();

  fetchUserById = mockFn<ICurrentUser['fetchUserById']>();

  setUser = mockFn<ICurrentUser['setUser']>();
}

export { currentUserToken } from './ICurrentUser';
