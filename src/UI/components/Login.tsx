import { useCallback, useEffect, useState } from 'react';
import { useObservable } from '../../hexact';
import { useNavigate } from 'react-router-dom';
import { authentication } from '../../useCases';

export function Login() {
  const isLogging = useObservable(authentication.isLogging$);
  const navigate = useNavigate();

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
      navigate('/dashboard');
    });
  }, [navigate]);

  if (isLogging) {
    return <div className="main-container">Logging...</div>;
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
