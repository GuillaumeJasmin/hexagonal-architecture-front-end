/* eslint-disable jest/valid-title */

import 'reflect-metadata';
import { CurrentUserTest } from '../CurrentUser/CurrentUserTest';
import type { IAuthentication } from './IAuthentication';
import { authenticationToken } from './IAuthentication';
import { UseCase, spySubscribe } from '../../../utils';
import Container from 'typedi';
import {
  AuthenticationApiTest,
  authenticationApiToken,
} from '../../ports/Api/AuthenticationApi/AuthenticationApiTest';
import {
  TokenStorageTest,
  tokenStorageToken,
} from '../../ports/Storage/TokenStorageTest';
import { currentUserToken } from '../CurrentUser/ICurrentUser';
import './Authentication';

describe('UseCase - Authentication', () => {
  let authentication: IAuthentication;
  let currentUser: CurrentUserTest;
  let authenticationApi: AuthenticationApiTest;
  let tokenStorage: TokenStorageTest;

  beforeEach(() => {
    authenticationApi = new AuthenticationApiTest();
    currentUser = new CurrentUserTest();
    tokenStorage = new TokenStorageTest();

    Container.set([
      { id: authenticationApiToken, value: authenticationApi },
      { id: currentUserToken, value: currentUser },
      { id: tokenStorageToken, value: tokenStorage },
    ]);

    authentication = Container.get(authenticationToken);

    UseCase.initializeAll();
  });

  it(`
    Given initial state
    When user wants to login
      And services is set to succeeded
    Then isLogging should changed 3 times with false, true and false
      And login services should have been called once with email and password
      And onLoginSucceeded event should have been called once
      And set token should have called with userId
  `, async () => {
    const userId = 'abc';

    const isLogging = spySubscribe(authentication.isLogging$);
    const onLoginSucceeded = spySubscribe(authentication.onLoginSucceeded$);

    authenticationApi.login.mockResolvedValue({ userId });
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
      userId,
    });

    expect(onLoginSucceeded).toHaveBeenCalledTimes(1);

    expect(tokenStorage.setToken).toHaveBeenCalledWith(userId);
  });

  it(`
    Given initial state
    When authentication is initialized
      And logout service is set to succeeded
      And user wants to logout
    Then logout services should have been called once
      And onLogoutSucceeded event should have been called once
      And remove token storage should have been called once
  `, async () => {
    const onLogoutSucceeded = spySubscribe(authentication.onLogoutSucceeded$);

    authentication.initialize();

    authenticationApi.logout.mockResolvedValue();

    await authentication.logout();

    expect(authenticationApi.logout).toHaveBeenCalledTimes(1);

    expect(onLogoutSucceeded).toHaveBeenCalledTimes(1);
    expect(tokenStorage.removeToken).toHaveBeenCalledTimes(1);
  });
});
