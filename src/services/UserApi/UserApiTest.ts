import { Container } from 'typedi';
import { UseCase } from '../../core';
import type { IUserApi } from './IUserApi';
import { userApiToken } from './IUserApi';

@UseCase(userApiToken)
export class UserApiTest implements IUserApi {
  fetchUserById = jest.fn<ReturnType<IUserApi['fetchUserById']>, Parameters<IUserApi['fetchUserById']>>();
}

export const authenticationApi = Container.get<UserApiTest>(userApiToken);
