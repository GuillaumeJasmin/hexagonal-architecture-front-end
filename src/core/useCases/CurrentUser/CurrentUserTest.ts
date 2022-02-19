import { ICurrentUser } from './ICurrentUser';
import { RegisterUseCase } from '../tools';
import { BehaviorSubject } from 'rxjs';

// @RegisterUseCase('CurrentUser')
export class CurrentUserTest implements ICurrentUser {
  user$ = new BehaviorSubject(null);
  
  fetchUserById = jest.fn<ReturnType<ICurrentUser['fetchUserById']>, Parameters<ICurrentUser['fetchUserById']>>();
}