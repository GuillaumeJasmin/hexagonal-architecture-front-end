import { Container } from 'typedi';
import { mockFn, ServiceTest } from '../../../utils';
import type { ICurrentUser } from './ICurrentUser';
import { currentUserToken } from './ICurrentUser';
import { mockBehaviorSubject } from '../../../utils';

@ServiceTest(currentUserToken)
export class CurrentUserTest implements ICurrentUser {
  user$ = mockBehaviorSubject<ICurrentUser['user$']>('User');

  fetchUserById = mockFn<ICurrentUser['fetchUserById']>();
  
  setUser = mockFn<ICurrentUser['setUser']>();
}

export function resetAndGetCurrentUser() {
  Container.set(currentUserToken, new CurrentUserTest());

  return Container.get<CurrentUserTest>(currentUserToken);
}