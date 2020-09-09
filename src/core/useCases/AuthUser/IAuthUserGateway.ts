import { Observable } from "rxjs";
import { AuthUserState } from './AuthUserState'

export interface IAuthUserGateway {
  login(data: { email: string; password: string }): Observable<{ user: AuthUserState['user'], token: string }>
  logout(): Observable<null>
}
