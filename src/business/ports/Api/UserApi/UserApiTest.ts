import { mockFn } from '../../../../utils';
import type { IUserApi } from './IUserApi';

export class UserApiTest implements IUserApi {
  fetchUserById = mockFn<IUserApi['fetchUserById']>();
}

export { userApiToken } from './IUserApi';