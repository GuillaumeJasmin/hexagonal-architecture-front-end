import React, { createContext, useContext } from 'react'
import { INotification } from 'src/core/useCases/Notification'
import { assertsIsDefined } from 'src/core/utils/assertions'

const NotificationContext = createContext<INotification | null>(null)

interface NotificationProviderProps {
  children: React.ReactNode;
  value: INotification;
}

export function NotificationProvider(props: NotificationProviderProps) {
  const { children, value } = props

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const notification = useContext(NotificationContext)

  assertsIsDefined(notification, 'notification feature doesn\'t exist')

  return notification
}
