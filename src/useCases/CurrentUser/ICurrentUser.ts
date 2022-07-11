import { Observable } from 'rxjs';
import { Token } from 'typedi';

interface User {
  id: string;
  name: string;
  email: string;
}

export interface CurrentUserState {
  user: null | User;
}

export interface ICurrentUser {
  user$: Observable<CurrentUserState['user']>;
  fetchUserById(data: { userId: string }): Promise<void>;
  setUser(user: CurrentUserState['user']): Promise<void>;
}

export const currentUserToken = new Token<ICurrentUser>('CurrentUser');