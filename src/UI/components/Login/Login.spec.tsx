/* eslint-disable jest/valid-title */
import 'reflect-metadata';
import { createMemoryHistory } from 'history';
import { fireEvent, render, screen } from '@testing-library/react';
import { resetAndGetAuthentication } from '../../../useCases/Authentication/AuthenticationTest';
// import { resetAndGetCurrentUser } from '../../../useCases/CurrentUser/CurrentUserTest';
import { Login } from './Login';
import { BrowserRouter, Router } from 'react-router-dom';

describe('Login', () => {
  let authentication: ReturnType<typeof resetAndGetAuthentication>;

  beforeEach(() => {
    authentication = resetAndGetAuthentication();
  });

  it(`
    Given initial render
      And user is not logged
      And user is not logging
    When I set email
      And I set password
      And I on submit the form
    Then login action should have been called once with email and password
  `, () => {
    authentication.isLogged$.mockNextValue(false);
    authentication.isLogging$.mockNextValue(false);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const email = screen.getByTestId('email');
    fireEvent.input(email, { target: { value: 'foo@bar.com' } });

    const password = screen.getByTestId('password');
    fireEvent.input(password, { target: { value: 'abc' } });

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(authentication.login).toHaveBeenCalledTimes(1);
    expect(authentication.login).toHaveBeenCalledWith({
      email: 'foo@bar.com',
      password: 'abc',
    });
  });

  it(`
    Given initial render
      And user is not logged
      And user is not logging
    When login succeed
    Then I should be redirected to the dashboard
  `, () => {
    const history = createMemoryHistory();

    authentication.isLogged$.mockNextValue(false);
    authentication.isLogging$.mockNextValue(false);

    render(
      <Router location={history.location} navigator={history}>
        <Login />
      </Router>
    );

    authentication.onLoginSucceeded$.mockNext();

    expect(history.location.pathname).toEqual('/dashboard');
  });
});
