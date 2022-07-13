/* eslint-disable jest/valid-title */

import 'reflect-metadata';
import { resetAndGetAuthenticationApi } from '../../ports/Api/AuthenticationApi/AuthenticationApiTest';
import { ITokenStorage } from '../../ports/Storage/ITokenStorage';
import { resetAndGetTokenStorage } from '../../ports/Storage/TokenStorageTest';
import { resetAndGetCurrentUser } from '../CurrentUser/CurrentUserTest';
import './Authentication';
import { getAuthentication } from './instance';
import { initializeUseCases, spySubscribe } from '../../../utils';

describe('UseCase - Authentication', () => {
  let authenticationApi: ReturnType<typeof resetAndGetAuthenticationApi>;
  let currentUser: ReturnType<typeof resetAndGetCurrentUser>;
  let tokenStorage: ReturnType<typeof resetAndGetTokenStorage>;
  let authentication: ReturnType<typeof getAuthentication>;

  beforeEach(() => {
    authenticationApi = resetAndGetAuthenticationApi();
    currentUser = resetAndGetCurrentUser();
    tokenStorage = resetAndGetTokenStorage();
    authentication = getAuthentication();
    // initializeUseCases();
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

  it(`
    Given a userId set in token storage
    When I init authentication
    Then fetchUserById service should have been called with userId
      And onRedirectToDashboard$ should have been called once
  `, async () => {
    const userId = 'abc';
    const onRedirectToDashboard = spySubscribe(
      authentication.onRedirectToDashboard$
    );

    tokenStorage.getToken.mockReturnValue(userId);

    await authentication.initAuthentication();

    expect(currentUser.fetchUserById).toHaveBeenCalledTimes(1);
    expect(currentUser.fetchUserById).toHaveBeenNthCalledWith(1, { userId });

    onRedirectToDashboard.expect.toHaveEmittedValues(undefined);
  });

  it(`
    Given a userId set to null in token storage
    When I init authentication
    Then fetchUserById should not have been called
      And onRedirectToLogin$ should have been called once
  `, async () => {
    const onRedirectToLogin = spySubscribe(authentication.onRedirectToLogin$);

    tokenStorage.getToken.mockReturnValue(null);

    await authentication.initAuthentication();

    expect(currentUser.fetchUserById).not.toHaveBeenCalled();

    onRedirectToLogin.expect.toHaveEmittedValues(undefined);
  });
});
