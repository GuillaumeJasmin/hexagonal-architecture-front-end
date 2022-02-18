import { RegisterService } from '../tools';
import type { IAuthenticationApi } from './IAuthenticationApi';

@RegisterService('Authentication')
export class AuthenticationApi implements IAuthenticationApi {
  login: IAuthenticationApi['login'] = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          userId: 'abc'
        });
      }, 2000);
    });
  }
}