`Store.ts`

```ts
interface Store<State> {
  constructor(initialState: State): Store<State>;
  setState(nextPartialState: Partial<State> | ((state: State) => Partial<State>)): void;
  select<T>(mapFn: (state: State) => T): Obersable<T>;
}
```

```ts
interface ICurrentUser {
  user$: Observable<User>;
}
```

```ts
interface IAuth {
  isLogging$: Observable<boolean>;
  isLogged$: Observable<boolean>;
  onLogin$: Observable<unknown>;
  onLogout$: Observable<unknown>;
  login(data: { email: string; password: string }): Promise<void>;
  logout(): Promise<void>;
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

  get isLogging$() {
    return this.select((state) => state.isLogging);
  }

  // Equal to:
  // get isLogging$() {
  //   return this.state$.pipe(map(state => state.isLogging));
  // };

  get isLogged$() {
    return this.currentUser.user$.pipe(
      map((user) => !!user),
      distinctUntilChanged()
    );
  }

  get onLogin$() {
    return this.isLogged$.pipe(filter((isLogged) => isLogged));
  }

  get onLogout$() {
    return this.isLogged$.pipe(filter((isLogged) => !isLogged));
  }

  myCustomEvent = new Subjet();

  constructor() {
    super(initialAuthState);

    this.onLogin$.subscribe(() => {
      // ...

      myCustomEvent.next();
    });
  }

  async login(data: { email: string; password: string }) {
    try {
      this.setState({ isLogging: true });
      const { userId } = await this.authService.login(data);
      await this.currentUser.fetchUserById({ userId });
    } catch (e) {
      this.setState({ loginError: '...' });
    } finally {
      this.setState({ isLogging: false });
    }
  }

  async logout() {
    // ...
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

`App.tsx`

```tsx
import './services/registerServices';
import './useCases/registerUseCases';

export function App() {
  return (
    ...
  )
}
```

`pages/Login.tsx`

```tsx
import { useCallback } from 'react';
import { useObservable } from '../utils';
import { auth } from '../useCases';

export function Login() {
  const isLogging = useObservable(auth.isLogging$);

  useEffect(() => {
    auth.onLogin$.subscribe(() => {
      // ...
    });
  }, []);

  const login = useCallback(() => {
    auth.login({ email: '...', password: '...' });
  }, []);

  return (
    <div>
      ...
    <div>
  )
}
```
