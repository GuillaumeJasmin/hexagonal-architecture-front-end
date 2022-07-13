/* eslint-disable jest/valid-title */
import 'reflect-metadata';
import { createMemoryHistory } from 'history';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { AuthenticationTest } from '../../../business/useCases/Authentication/AuthenticationTest';
import { CurrentUserTest } from '../../../business/useCases/CurrentUser/CurrentUserTest';
import { Dashboard } from './Dashboard';
import { authenticationToken } from '../../../business/useCases/Authentication/IAuthentication';
import { currentUserToken } from '../../../business/useCases/CurrentUser/ICurrentUser';
import Container from 'typedi';

describe('Dashboard', () => {
  let authentication: AuthenticationTest;
  let currentUser: CurrentUserTest;

  beforeEach(() => {
    authentication = new AuthenticationTest();
    currentUser = new CurrentUserTest();

    Container.set([
      { id: authenticationToken, value: authentication },
      { id: currentUserToken, value: currentUser },
    ]);
  });

  it(`
    Given a connected user
    Then I click on logout button
    Then logout should have been called once
  `, () => {
    currentUser.user$.mockNextValue({
      id: '1',
      email: 'bob@gmail.com',
      name: 'Bob',
    });

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: 'Logout' });

    fireEvent.click(button);

    expect(authentication.logout).toHaveBeenCalledTimes(1);
  });

  it(`
    Given a non connected user
    Then I should be redirected to the login page
  `, () => {
    currentUser.user$.mockNextValue(null);

    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <Dashboard />
      </Router>
    );

    expect(history.location.pathname).toEqual('/login');
  });
});
