import { RegisterUseCase, getUseCase } from '../../hexactInstance';
import { ICurrentUser } from './ICurrentUser';
import { BehaviorSubject } from 'rxjs';

@RegisterUseCase('CurrentUser')
export class CurrentUserTest implements ICurrentUser {
  user$ = new BehaviorSubject(null);
  
  fetchUserById = jest.fn<ReturnType<ICurrentUser['fetchUserById']>, Parameters<ICurrentUser['fetchUserById']>>();
  
  setUser = jest.fn<ReturnType<ICurrentUser['setUser']>, Parameters<ICurrentUser['setUser']>>();
}

export const currentUserUseCase = getUseCase('CurrentUser') as CurrentUserTest;