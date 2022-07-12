import { Token } from 'typedi';

interface User {
  id: string;
  name: string;
  email: string;
}

export interface IUserApi {
  fetchUserById(data: { userId: string }): Promise<User>;
}

export const userApiToken = new Token<IUserApi>('UserApi');
