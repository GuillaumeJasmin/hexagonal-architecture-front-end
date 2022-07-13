import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Dashboard } from './components/Dashboard/Dashboard';
import { useInstances } from '../business/useCases/instances';
import { useEffect } from 'react';
import { useSubscribe } from '../utils';
import { useObservable } from '@ngneat/react-rxjs';

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function useAuthentication() {
  const { authentication } = useInstances();
  const navigate = useNavigate();
  const [isInitialized] = useObservable(authentication.isInitialized$);

  useEffect(() => {
    authentication.initAuthentication();
  }, [authentication]);

  useSubscribe(authentication.onRedirectToDashboard$, () => {
    console.log('## App - onRedirectToDashboard');
    navigate('/dashboard');
  });
  
  useSubscribe(authentication.onRedirectToLogin$, () => {
    console.log('## App - onRedirectToLogin');
    navigate('/login');
  });

  return isInitialized;
}

function AppRoutes() {
  const isInitialized = useAuthentication();
  
  if (!isInitialized) {
    return <div>Init...</div>
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Navigate replace to="/dashboard" />} />
    </Routes>
  );
}
