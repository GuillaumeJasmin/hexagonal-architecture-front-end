import { useState, useEffect, useMemo } from 'react'
import { Observable } from 'rxjs'

export function useObservableData<T>(observable$: Observable<T>) {
  const defaultState = useMemo(() => {
    let output: T
    observable$.subscribe((data) => {
      output = data
    }).unsubscribe()

    // @ts-expect-error
    return output
  }, []) // eslint-disable-line

  const [data, setData] = useState<T>(defaultState)

  useEffect(() => {
    const subscription = observable$
      .subscribe((data) => {
        setData(data)
      })

    return () => subscription.unsubscribe()
  }, []) // eslint-disable-line

  return data
}
