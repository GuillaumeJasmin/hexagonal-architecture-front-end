import { Service } from 'typedi';
import { Subject } from 'rxjs';
import { authenticationApiToken } from '../../business/ports/Api/AuthenticationApi/IAuthenticationApi';
import type { IAuthenticationApi } from '../../business/ports/Api/AuthenticationApi/IAuthenticationApi';

@Service(authenticationApiToken)
export class AuthenticationApi implements IAuthenticationApi {
  public onUnauthorized$ = new Subject<void>();

  public login: IAuthenticationApi['login'] = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          userId: 'abc',
        });
      }, 100);
    });
  };

  public logout: IAuthenticationApi['logout'] = () => {
    return new Promise((resolve) => setTimeout(resolve, 100));
  };
}
