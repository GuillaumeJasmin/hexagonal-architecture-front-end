import React from 'react';
import { CookiesTokenStorage } from 'src/adapters/secondary/CookiesTokenStorage'
import { HTTPAuthUserGateway } from 'src/adapters/secondary/HTTPAuthUserGateway'
import { HTTPSearchGateway } from 'src/adapters/secondary/HTTPSearchGateway'
import { AuthUser } from 'src/core/useCases/AuthUser'
import { Search } from 'src/core/useCases/Search'
import { Locale } from 'src/core/useCases/Locale'
import { Notification } from 'src/core/useCases/Notification'
import { AuthUserProvider } from './contexts/AuthUser'
import { SearchProvider } from './contexts/Search'
import { NotificationProvider } from './contexts/Notification'
import { Nav } from './components/Nav'
import { NotificationBanner } from './components/NotificationBanner'
import { Router } from './Router'

import './App.css';

export function App() {
  const notification = new Notification()

  const authUser = new AuthUser(
    new HTTPAuthUserGateway(notification),
    new CookiesTokenStorage()
  )

  const search = new Search(
    new HTTPSearchGateway(notification),
    authUser,
    new Locale()
  )

  return (
    <AuthUserProvider value={authUser}>
      <NotificationProvider value={notification}>
        <header>
          <NotificationBanner />
          <Nav />
        </header>
        <SearchProvider value={search}>
          <Router />
        </SearchProvider>
      </NotificationProvider>
    </AuthUserProvider>
  );
}
