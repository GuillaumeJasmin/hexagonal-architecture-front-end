import { Observable } from 'rxjs';
import { UseCase, Token } from '../../../utils';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CurrentUserState {
  user: null | User;
}

export interface ICurrentUser extends UseCase {
  user$: Observable<CurrentUserState['user']>;
  fetchUserById(data: { userId: string }): Promise<void>;
  setUser(user: CurrentUserState['user']): Promise<void>;
}

export const currentUserToken = new Token<ICurrentUser>('CurrentUser');
