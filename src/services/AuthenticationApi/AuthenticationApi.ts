import { Service } from 'typedi';
import { authenticationApiToken } from './IAuthenticationApi';
import type { IAuthenticationApi } from './IAuthenticationApi';

@Service(authenticationApiToken)
export class AuthenticationApi implements IAuthenticationApi {
  login: IAuthenticationApi['login'] = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          userId: 'abc',
        });
      }, 100);
    });
  };

  logout: IAuthenticationApi['logout'] = () => {
    return new Promise((resolve) => setTimeout(resolve, 100));
  };
}
