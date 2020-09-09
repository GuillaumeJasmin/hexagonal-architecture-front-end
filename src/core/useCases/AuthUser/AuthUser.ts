import { map, distinctUntilChanged } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { Store } from '../../utils/Store'
import { ITokenStorage } from '../../ports/ITokenStorage'
import { IAuthUser } from './IAuthUser'
import { IAuthUserGateway } from './IAuthUserGateway'
import { AuthUserState, ValidationsError } from './AuthUserState'
import { AuthUserValidations } from './AuthUserValidations'
import { AuthUserErrorUnauthenticated } from './AuthUserErrors'

const initialState: AuthUserState = {
  isLogging: false,
  user: null,
}

export class AuthUser extends Store<AuthUserState> implements IAuthUser {
  private onLoginSubject$ = new Subject()

  private onLogoutSubject$ = new Subject()

  private validations = new AuthUserValidations()

  isLogging$ = this.state$.pipe(map(state => state.isLogging), distinctUntilChanged())

  isLogged$ = this.state$.pipe(map(state => !!state.user), distinctUntilChanged())

  user$ = this.state$.pipe(map(state => state.user), distinctUntilChanged())

  loginErrors$ = this.state$.pipe(map(state => state.loginErrors), distinctUntilChanged())

  onLogin$ = this.onLogoutSubject$.asObservable()

  onLogout$ = this.onLogoutSubject$.asObservable()

  constructor(
    private gateway: IAuthUserGateway,
    private tokenStorage: ITokenStorage,
  ) {
    super(initialState)
  }

  login(data: { email: string; password: string }) {
    const errors = this.validations.validateLogin(data)

    this.setState({
      isLogging: !errors,
      loginErrors: errors,
    })

    if (errors) {
      return
    }

    this.gateway.login(data).subscribe(
      (data) => {
        this.tokenStorage.setToken(data.token)

        this.setState({
          isLogging: false,
          user: data.user,
        })

        this.onLoginSubject$.next()
      },
      (error) => {
        if (error instanceof AuthUserErrorUnauthenticated) {
          this.setState({
            isLogging: false,
            loginErrors: {
              email: ValidationsError.BAD_CREDENTIALS,
            }
          })
        }
      }
    )
  }

  logout() {
    this.gateway.logout().subscribe(() => {
      this.onLogoutSubject$.next()
    })
  }
}
