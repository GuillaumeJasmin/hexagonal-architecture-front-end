import { Container } from 'typedi';
import { mockFn, ServiceTest } from '../../../../utils';
import type { IUserApi } from './IUserApi';
import { userApiToken } from './IUserApi';

@ServiceTest(userApiToken)
export class UserApiTest implements IUserApi {
  fetchUserById = mockFn<IUserApi['fetchUserById']>();
}

export function resetAndGetUserApi() {
  Container.set(userApiToken, new UserApiTest());

  return Container.get<UserApiTest>(userApiToken);
}
