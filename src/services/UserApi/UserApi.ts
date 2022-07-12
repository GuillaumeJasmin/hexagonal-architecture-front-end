import { Service } from 'typedi';
import { userApiToken } from '../../business/ports/Api/UserApi/IUserApi';
import type { IUserApi } from '../../business/ports/Api/UserApi/IUserApi';

@Service(userApiToken)
export class UserApi implements IUserApi {
  fetchUserById: IUserApi['fetchUserById'] = (data) => {
    console.log(`fetching user ${data.userId}`)

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'abc',
          name: 'John Doe',
          email: 'john.doe@gmail.com',
        });
      }, 500);
    });
  }
}