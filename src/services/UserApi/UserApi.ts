import { RegisterService } from '../../hexactInstance';
import type { IUserApi } from './IUserApi';

@RegisterService('User')
export class UserApi implements IUserApi {
  fetchUserById: IUserApi['fetchUserById'] = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'abc',
          name: 'John Doe',
          email: 'john.doe@gmail.com',
        });
      }, 2000);
    });
  }
}