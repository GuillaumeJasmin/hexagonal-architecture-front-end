import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useObservable } from '@ngneat/react-rxjs';
import { useSubscribe } from '../../hooks/useSubscribe';
import { Container } from '../../../utils';
import { authenticationToken } from '../../../business/useCases/Authentication/IAuthentication';
import { currentUserToken } from '../../../business/useCases/CurrentUser/ICurrentUser';

export function Dashboard() {
  const authentication = Container.get(authenticationToken);
  const currentUser = Container.get(currentUserToken);

  const navigate = useNavigate();
  const [user] = useObservable(currentUser.user$);

  const navigateToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  useSubscribe(authentication.onLogoutSucceeded$, () => {
    navigateToLogin();
  });

  useEffect(() => {
    if (!user) {
      navigateToLogin();
    }
  }, [user, navigateToLogin]);

  const logout = useCallback(() => {
    authentication.logout();
  }, [authentication]);

  if (!user) {
    return null;
  }

  return (
    <div className="main-container">
      {user.name} - {user.email}
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
