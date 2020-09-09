import React, { createContext, useContext } from 'react'
import { IAuthUser } from 'src/core/useCases/AuthUser'
import { assertsIsDefined } from 'src/core/utils/assertions'

const AuthUserContext = createContext<IAuthUser | null>(null)

interface AuthUserProviderProps {
  children: React.ReactNode;
  value: IAuthUser;
}

export function AuthUserProvider(props: AuthUserProviderProps) {
  const { children, value } = props

  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  )
}

export function useAuthUser() {
  const authUser = useContext(AuthUserContext)

  assertsIsDefined(authUser, 'AuthUser feature doesn\'t exist')

  return authUser
}
