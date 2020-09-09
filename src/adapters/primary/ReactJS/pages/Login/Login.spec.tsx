import { render, fireEvent, act } from '@testing-library/react'
import React from 'react'
import { of } from 'rxjs'
import { IAuthUser } from 'src/core/useCases/AuthUser'
import { Store } from 'src/core/utils/Store'
import { AuthUserProvider } from '../../contexts/AuthUser'
import { Login } from './Login'

class TestAuthUser extends Store<void> implements IAuthUser {
  isLogging$ = of(false)

  isLogged$ = of(false)

  user$ = of(null)

  loginErrors$ = of({})

  login = jest.fn()

  logout = jest.fn()
}

describe('Login Page', () => {
  let authUser: TestAuthUser

  beforeEach(() => {
    authUser = new TestAuthUser()
  })

  it('should trigger login with values', async () => {
    const { findByTestId } = render(
      <AuthUserProvider value={authUser}>
        <Login />
      </AuthUserProvider>,
    )

    const email = await findByTestId('email')
    fireEvent.input(email, { target: { value: 'foo@bar.com' } })

    const password = await findByTestId('password')
    fireEvent.input(password, { target: { value: 'pass' } })

    const button = await findByTestId('form-submit-button')
    expect(button).toBeDefined()

    await act(async () => {
      fireEvent.click(button)
    })

    expect(authUser.login).toHaveBeenCalledTimes(1)
    expect(authUser.login).toHaveBeenLastCalledWith({ email: 'foo@bar.com', password: 'pass' })
  })

  it('should show error', () => {
    authUser.loginErrors$ = of({
      email: 'EMAIL_ERROR',
      password: 'PASSWORD_ERROR',
    })

    const { getByText } = render(
      <AuthUserProvider value={authUser}>
        <Login />
      </AuthUserProvider>,
    )

    const emailError = getByText('EMAIL_ERROR')
    expect(emailError).toBeDefined()

    const passwordError = getByText('PASSWORD_ERROR')
    expect(passwordError).toBeDefined()
  })
})
