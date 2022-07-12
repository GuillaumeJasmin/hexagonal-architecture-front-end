# Hexy

An simple library to help build front-end hexagonal architecture

After many year as front-end developer, I always find hard to build a perfet hexagonal architecture.
I offen use redux for my front-end projet. It's a amazing lib that make possible to use FLUX pattern very easy.
...

## use-cases

Use-case are the core logic of an application.

```ts
useCases
  └── Authentication
        └── Authentication.ts         # Main class of the use-case
        └── Authentication.spec.ts    # Unit tests
        └── AuthenticationMock.ts     # Fake class with spy
        └── IAuthentication.ts        # Interface of the use-case
```

### Authentication.ts

```ts
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { Store } from 'hexy';
import { RegisterUseCase, InjectUseCase, InjectService } from '../hexyInstance';
import type { IAuthenticationApi } from './services/AuthenticationApi/IAuthenticationApi';
import { IAuthentication, AuthenticationState } from './IAuthentication';
import type { ICurrentUser } from '../CurrentUser/ICurrentUser';

const initialAuthenticationState: AuthenticationState = {
  isLogging: false,
  loginError: null,
};

@RegisterUseCase('Authentication')
export class Authentication extends Store<AuthenticationState> implements IAuthentication {
  @InjectUseCase('CurrentUser')
  private currentUser!: ICurrentUser;

  @InjectService('Authentication')
  private authenticationApi!: IAuthenticationApi;

  public get isLogged$() {
    return this.currentUser.user$.pipe(
      map((user) => !!user),
      distinctUntilChanged()
    );
  }

  public get isLogging$() {
    return this.select((state) => state.isLogging);
  }

  public get onLoginSucceeded$() {
    return this.isLogged$.pipe(
      filter((isLogged) => isLogged),
      distinctUntilChanged(),
      tap(() => console.log('onLoginSucceeded$'))
    );
  }

  public get onLogoutSucceeded$() {
    return this.isLogged$.pipe(
      filter((isLogged) => !isLogged),
      distinctUntilChanged(),
      tap(() => console.log('onLogoutSucceeded$'))
    );
  }

  constructor() {
    super(initialAuthenticationState);
  }

  public async login(data: { email: string; password: string }) {
    try {
      this.setState({ isLogging: true });
      const { userId } = await this.authenticationApi.login(data);
      await this.currentUser.fetchUserById({ userId });
    } catch (error: unknown) {
      this.setState({ loginError: 'Error' });
    } finally {
      this.setState({ isLogging: false });
    }
  }
}
```

## Services

```ts
services
  └── AuthenticationApi
        └── AuthenticationApi.ts         # Main class of the service
        └── AuthenticationApiMock.ts     # Fake class with spy
        └── IAuthenticationApi.ts        # Interface of the service
```


### Resources

https://medium.com/ssense-tech/hexagonal-architecture-there-are-always-two-sides-to-every-story-bc0780ed7d9c