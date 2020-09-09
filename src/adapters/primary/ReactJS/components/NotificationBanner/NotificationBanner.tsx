import { useNotification } from '../../contexts/Notification'
import React, { useEffect, useState } from 'react'

export function NotificationBanner() {
  const [error, setError] = useState<string | null>(null)
  const notification = useNotification()

  useEffect(() => {
    const subscription = notification.onError$.subscribe((incomningError) => {
      setError(incomningError)
      setTimeout(() => {
        setError('')
      }, 3000);
    })

    return () => subscription.unsubscribe()
  }, [notification.onError$])

  if (!error) {
    return null
  }

  return (
    <div>
      {error}
    </div>
  )
}
