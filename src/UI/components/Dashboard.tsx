import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUseCase } from '../../hexactInstance';
import { currentUser } from '../../useCases';
import { useObservable } from '../../hexact';

export function Dashboard() {
  const navigate = useNavigate();
  const user = useObservable(currentUser.user$);
  const authentication = getUseCase('Authentication');

  // if (!user) {
  //   throw new Error('User undefined');
  // }

  useEffect(() => {
    authentication.onLogoutSucceeded$.subscribe(() => {
      navigate('/');
    });
  }, [authentication, navigate]);

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
