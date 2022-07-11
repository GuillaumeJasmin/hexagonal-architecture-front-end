import { Container } from 'typedi';
import { mockFn } from '../../core';
import type { IUserApi } from './IUserApi';
import { userApiToken } from './IUserApi';

export class UserApiTest implements IUserApi {
  fetchUserById = mockFn<IUserApi['fetchUserById']>();
}

export function resetAndGetUserApi() {
  Container.set(userApiToken, new UserApiTest());

  return Container.get<UserApiTest>(userApiToken);
}
