import { Container } from 'typedi';
import { UseCaseTest } from '../../core';
import type { ICurrentUser } from './ICurrentUser';
import { currentUserToken } from './ICurrentUser';
import { mockBehaviorSubject } from '../../core/RxJSMock';

@UseCaseTest(currentUserToken)
export class CurrentUserTest implements ICurrentUser {
  user$ = mockBehaviorSubject<ICurrentUser['user$']>('User');

  fetchUserById = jest.fn<
    ReturnType<ICurrentUser['fetchUserById']>,
    Parameters<ICurrentUser['fetchUserById']>
  >();

  setUser = jest.fn<
    ReturnType<ICurrentUser['setUser']>,
    Parameters<ICurrentUser['setUser']>
  >();
}

export function resetAndGetCurrentUser() {
  Container.set(currentUserToken, new CurrentUserTest());

  return Container.get<CurrentUserTest>(currentUserToken);
}