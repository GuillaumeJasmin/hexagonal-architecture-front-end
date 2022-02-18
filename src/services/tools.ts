import { createServicesTools } from '../core/utils/decorators';
import { IAuthenticationApi } from './AuthenticationApi/IAuthenticationApi';
import { IUserApi } from './UserApi/IUserApi';

type Services = {
  Authentication: IAuthenticationApi;
  User: IUserApi;
};

export const { RegisterService, InjectService, getService, setService } =
  createServicesTools<Services>();
