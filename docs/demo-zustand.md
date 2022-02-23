`Store.ts`

```ts
class Store<State> {
  protected store = create(() => this.initialState);

  protected select<T>(mapFn: (state: State) => T) {
    return mapFn(this.store.getState());
  }

  protected get state() {
    return this.store.getState();
  }

  constructor(private initialState: State) {}
}
```


`useCases/Auth/Auth.ts`

```ts
import { Service, Inject } from 'typedi';
import { distinctUntilChanged, map } from 'rxjs';
import { Store } from '../utils/Store';
import { IAuthService } from '../services/AuthService';
import { ICurrentUser } from '../useCases/CurrentUser';

interface AuthState {
  userId: string | null;
  isLogging: boolean;
  loginError: string | null;
}

const initialAuthState: AuthState = {
  userId: null,
  isLogging: false,
  loginError: null,
};

@Service('useCases.auth')
export class Auth extends Store<AuthState> implements IAuth {
  @Inject('services.authService')
  private authService!: IAuthService;

  @Inject('useCases.currentUser')
  private currentUser!: ICurrentUser;

  public selectIsLogging() {
    return this.state.isLogging;
  }

  public selectIsLogged() {
    return this.state.isLogged;
  }

  constructor() {
    super(initialAuthState);

    this.currentUser.subscribe(
      () => this.currentUser.selectUser(),
      (user) => {
        this.store.setState({ isLogged: !!user });
      }
    );
  }

  public async login(data: { email: string; password: string }) {
    try {
      this.store.setState({ isLogging: true });
      const { userId } = await this.authService.login(data);
      await this.currentUser.fetchUserById({ userId });
    } catch (e) {
      this.store.setState({ loginError: '...' });
    } finally {
      this.store.setState({ isLogging: false });
    }
  }
}
```

`useCases/registerUseCases.ts`

```ts
import './Auth/Auth';
import './CurrentUser/CurrentUser';
```

`services/registerServices.ts`

```ts
import './AuthService/AuthService';
```

`useCases/index.ts`

```ts
import { Container } from 'typedi';
import { IAuth } from './Auth/IAuth';
import { ICurrentUser } from './CurrentUser/ICurrentUser';

export const auth = Container.get<IAuth>('useCases.auth');
export const currentUser = Container.get<ICurrentUser>('useCases.currentUser');
```