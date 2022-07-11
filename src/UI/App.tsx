import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Dashboard } from './components/Dashboard/Dashboard';
import { useEffect } from 'react';
import { useInstances } from '../useCases/instances';

export function App() {
  const { authentication } = useInstances();

  useEffect(() => {
    authentication.onLoginSucceeded$.subscribe(() => {
      console.log('onLoginSucceeded redirection');
    });
  }, [authentication]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
