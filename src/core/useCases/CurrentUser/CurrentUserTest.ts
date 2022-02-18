import { Store } from '../../utils/Store';
import { ICurrentUser, CurrentUserState } from './ICurrentUser';
import { RegisterUseCase } from '../tools';
import { BehaviorSubject } from 'rxjs';

@RegisterUseCase('CurrentUser')
export class AuthUser extends Store<CurrentUserState> implements ICurrentUser {
  user$ = new BehaviorSubject(null);
  
  fetchUserById = jest.fn<ReturnType<ICurrentUser['fetchUserById']>, Parameters<ICurrentUser['fetchUserById']>>();
}