/* eslint-disable jest/valid-title */
import 'reflect-metadata';
import { createMemoryHistory } from 'history';
import { fireEvent, render, screen } from '@testing-library/react';
import { resetAndGetAuthentication } from '../../../business/useCases/Authentication/AuthenticationTest';
import { resetAndGetCurrentUser } from '../../../business/useCases/CurrentUser/CurrentUserTest';
import { Dashboard } from './Dashboard';
import { BrowserRouter, Router } from 'react-router-dom';

describe('Dashboard', () => {
  let authentication: ReturnType<typeof resetAndGetAuthentication>;
  let currentUser: ReturnType<typeof resetAndGetCurrentUser>;

  beforeEach(() => {
    authentication = resetAndGetAuthentication();
    currentUser = resetAndGetCurrentUser();
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
