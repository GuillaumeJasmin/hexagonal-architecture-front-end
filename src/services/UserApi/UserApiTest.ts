import { getService, RegisterService } from '../../hexactInstance';
import type { IUserApi } from './IUserApi';

@RegisterService('User')
export class UserApiTest implements IUserApi {
  fetchUserById = jest.fn<ReturnType<IUserApi['fetchUserById']>, Parameters<IUserApi['fetchUserById']>>();
}

export const userApi = getService('User') as UserApiTest;
