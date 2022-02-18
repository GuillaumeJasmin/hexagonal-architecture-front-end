import { createUseCasesTools } from '../utils/decorators';
import { IAuthentication } from './Authentication/IAuthentication';
import { ICurrentUser } from './CurrentUser/ICurrentUser';

type UseCases = {
  Authentication: IAuthentication;
  CurrentUser: ICurrentUser;
};

export const { RegisterUseCase, InjectUseCase, setUseCase, getUseCase } =
  createUseCasesTools<UseCases>();