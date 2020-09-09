import React, { useState } from 'react'
import { useObservableData } from 'src/core/utils/useObservable'
import { useAuthUser } from '../../contexts/AuthUser'

export function Login() {
  const authUser = useAuthUser()
  const errors = useObservableData(authUser.loginErrors$)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)

  const onSubmit = () => {
    authUser.login({ email, password })
  }

  return (
    <div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          data-testid="email"
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
        />
        {errors?.email && (
          <div className="error">{errors?.email}</div>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          data-testid="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
        />
        {errors?.password && (
          <div className="error">{errors?.password}</div>
        )}
      </div>
      <button data-testid="form-submit-button" onClick={onSubmit}>Login</button>
    </div>
  )
}
