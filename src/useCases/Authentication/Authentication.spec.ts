/* eslint-disable jest/valid-title */

import 'reflect-metadata';
import { Observable } from 'rxjs';
import { resetAndGetAuthenticationApi } from '../../services/AuthenticationApi/AuthenticationApiTest';
import { resetAndGetCurrentUser } from '../../useCases/CurrentUser/CurrentUserTest';
import './Authentication';
import { getAuthentication } from './instance';
import { initializeUseCases } from '../../core/initializeUseCases';

function spySubscribe(obs$: Observable<any>) {
  const subscription = jest.fn();

  obs$.subscribe(subscription);

  return subscription;
}

describe('UseCase - Authentication', () => {
  let authenticationApi: ReturnType<typeof resetAndGetAuthenticationApi>;
  let currentUser: ReturnType<typeof resetAndGetCurrentUser>;
  let authentication: ReturnType<typeof getAuthentication>;

  beforeEach(() => {
    authenticationApi = resetAndGetAuthenticationApi();
    currentUser = resetAndGetCurrentUser();
    authentication = getAuthentication();
    initializeUseCases();
  });

  it(`
    Given initial state
    When user wants to login
      And services is set to succeeded
    Then isLogging should changed 3 times with false, true and false
      And login services should have been called once with email and password
      And onLoginSucceeded event should have been called once
  `, async () => {
    const isLogging = spySubscribe(authentication.isLogging$);
    const onLoginSucceeded = spySubscribe(authentication.onLoginSucceeded$);

    authenticationApi.login.mockReturnValue(Promise.resolve({ userId: 'abc' }));
    currentUser.fetchUserById.mockResolvedValue();

    await authentication.login({
      email: 'john.doe@email.com',
      password: 'abc',
    });

    expect(isLogging).toHaveBeenNthCalledWith(1, false);
    expect(isLogging).toHaveBeenNthCalledWith(2, true);
    expect(isLogging).toHaveBeenNthCalledWith(3, false);
    expect(isLogging).toHaveBeenCalledTimes(3);

    expect(authenticationApi.login).toHaveBeenCalledTimes(1);
    expect(authenticationApi.login).toHaveBeenCalledWith({
      email: 'john.doe@email.com',
      password: 'abc',
    });

    expect(currentUser.fetchUserById).toHaveBeenCalledTimes(1);
    expect(currentUser.fetchUserById).toHaveBeenNthCalledWith(1, {
      userId: 'abc',
    });

    expect(onLoginSucceeded).toHaveBeenCalledTimes(1);
  });

  it(`
    Given initial state
    When user wants to logout
      And services is set to succeeded
    Then logout services should have been called once
      And onLogoutSucceeded event should have been called once
  `, async () => {
    const onLogoutSucceeded = spySubscribe(authentication.onLogoutSucceeded$);

    authenticationApi.logout.mockResolvedValue();

    await authentication.logout();

    expect(authenticationApi.logout).toHaveBeenCalledTimes(1);

    expect(onLogoutSucceeded).toHaveBeenCalledTimes(1);
  });
});
