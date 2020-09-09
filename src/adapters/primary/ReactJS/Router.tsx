import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'

export function Router() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </BrowserRouter>
  )
}
