/* eslint-disable jest/valid-title */

import 'reflect-metadata';
import { resetAndGetAuthenticationApi } from '../../services/AuthenticationApi/AuthenticationApiTest';
import { resetAndGetCurrentUser } from '../../useCases/CurrentUser/CurrentUserTest';
import './Authentication';
import { getAuthentication } from './instance';
import { initializeUseCases, spySubscribe } from '../../core';

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

    authenticationApi.login.mockResolvedValue({ userId: 'abc' });
    currentUser.fetchUserById.mockResolvedValue();

    await authentication.login({
      email: 'john.doe@email.com',
      password: '0000',
    });

    isLogging.expect.toHaveEmittedValues(false, true, false);

    expect(authenticationApi.login).toHaveBeenCalledTimes(1);
    expect(authenticationApi.login).toHaveBeenCalledWith({
      email: 'john.doe@email.com',
      password: '0000',
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
