import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { authentication, currentUser } from './core/useCases';
import { useObservable } from './core/utils/useObservable';

function App() {
  const user = useObservable(currentUser.user$);
  const isLogging = useObservable(authentication.isLogging$);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const onChangePassword = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      authentication.login({ email, password });
    },
    [email, password]
  );

  useEffect(() => {
    authentication.onLoginSucceeded$.subscribe(() => {
      console.log('redirect to dashboard');
    });
  }, []);

  if (isLogging) {
    return <div className="main-container">Logging...</div>;
  }

  if (user) {
    return (
      <div className="main-container">
        {user.name} - {user.email}
      </div>
    );
  }

  return (
    <div className="main-container">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          data-testid="email"
          name="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="email"
        />
        <input
          type="password"
          data-testid="password"
          name="email"
          value={password}
          onChange={onChangePassword}
          placeholder="password"
        />
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
}

export default App;
