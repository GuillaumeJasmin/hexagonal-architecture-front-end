import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useObservable } from '@ngneat/react-rxjs';
import { useInstances } from '../../../business/useCases/instances';
import { useSubscribe } from '../../../utils';

export function Dashboard() {
  const { currentUser, authentication } = useInstances();

  const navigate = useNavigate();
  const [user] = useObservable(currentUser.user$);

  const navigateToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  useSubscribe(authentication.onLogoutSucceeded$, () => {
    console.log('## Dashboard - onRedirectToLogin');
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
