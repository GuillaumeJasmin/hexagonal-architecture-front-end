import { Observable } from 'rxjs'
import { AuthUserState } from './AuthUserState'

export interface IAuthUser {
  isLogged$: Observable<boolean>
  isLogging$: Observable<boolean>
  user$: Observable<AuthUserState['user']>
  loginErrors$: Observable<AuthUserState['loginErrors']>
  login(data: { email: string; password: string }): void
}
