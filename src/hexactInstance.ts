import { createHexact } from './hexact';

import { IAuthentication } from './useCases/Authentication/IAuthentication';
import { ICurrentUser } from './useCases/CurrentUser/ICurrentUser';

import { IAuthenticationApi } from './services/AuthenticationApi/IAuthenticationApi';
import { IUserApi } from './services/UserApi/IUserApi';

type UseCases = {
  Authentication: IAuthentication;
  CurrentUser: ICurrentUser;
};

type Services = {
  Authentication: IAuthenticationApi;
  User: IUserApi;
};

export const {
  InjectService,
  InjectUseCase,
  RegisterService,
  RegisterUseCase,
  getService,
  getUseCase,
  setService,
  setUseCase,
} = createHexact<Services, UseCases>();
