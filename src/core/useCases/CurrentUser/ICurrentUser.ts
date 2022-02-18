import { Observable } from 'rxjs';

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
}
