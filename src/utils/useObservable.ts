import { useState, useEffect } from 'react'
import { Observable } from 'rxjs'

export function useObservableData<T>(observable$: Observable<T>) {
  const [data, setData] = useState<T | undefined>(() => {
    let initialValue: T | undefined = undefined;
    
    observable$.subscribe((data) => {
      initialValue = data
    }).unsubscribe()

    return initialValue
  })

  useEffect(() => {
    const subscription = observable$.subscribe(setData)

    return () => subscription.unsubscribe()
  }, []) // eslint-disable-line

  return data as T;
}