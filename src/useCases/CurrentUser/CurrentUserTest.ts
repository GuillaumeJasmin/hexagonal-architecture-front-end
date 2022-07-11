import { Container } from 'typedi';
import { mockFn } from '../../core';
import type { ICurrentUser } from './ICurrentUser';
import { currentUserToken } from './ICurrentUser';
import { mockBehaviorSubject } from '../../core';

export class CurrentUserTest implements ICurrentUser {
  user$ = mockBehaviorSubject<ICurrentUser['user$']>('User');

  fetchUserById = mockFn<ICurrentUser['fetchUserById']>();
  
  setUser = mockFn<ICurrentUser['setUser']>();
}

export function resetAndGetCurrentUser() {
  Container.set(currentUserToken, new CurrentUserTest());

  return Container.get<CurrentUserTest>(currentUserToken);
}