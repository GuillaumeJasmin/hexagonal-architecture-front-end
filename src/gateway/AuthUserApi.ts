import { RegisterApiService } from '../utils/decorators';
import type { IAuthUserApi } from '../gatewayInterfaces/IAuthUserApi';

@RegisterApiService('AuthUser')
export class AuthUserApi implements IAuthUserApi {
  fetchUser: IAuthUserApi['fetchUser'] = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'John Doe',
          email: 'john.doe@gmail.com',
          defaultLanguage: 'fr',
        });
      }, 2000);
    });
  }
}
