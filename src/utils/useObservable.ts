import { useState, useEffect } from 'react'
import { Observable } from 'rxjs'
import { getBehaviorSubjectValue } from './getBehaviorSubjectValue'

export function useObservable<T>(observable$: Observable<T>) {
  const [data, setData] = useState<T | undefined>(() => {
    return getBehaviorSubjectValue(observable$);
  })

  useEffect(() => {
    // const subscription = observable$.subscribe(setData)
    const subscription = observable$.subscribe(setData)

    return () => subscription.unsubscribe()
  }, []) // eslint-disable-line

  return data as T;
}