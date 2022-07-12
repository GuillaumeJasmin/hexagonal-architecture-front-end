import { useEffect } from 'react';
import { useLatest } from 'react-use';
import { Observable } from 'rxjs';

// export function useSubscription(hook: () => Subscription, deps: any[]) {
//   useEffect(() => {
//     const sub = hook();

//     return sub.unsubscribe();
//   }, deps);
// }

export function useSubscribe<T>(
  observable$: Observable<T>,
  subscribeCallback: (value: T) => void
) {
  const latestSubscribeCallback = useLatest(subscribeCallback);

  useEffect(() => {
    const sub = observable$.subscribe(latestSubscribeCallback.current);

    return () => {
      sub.unsubscribe();
    };
  }, [observable$, latestSubscribeCallback]);
}

// Alternatives:

// with useEffect$() from @ngneat/react-rxjs
//
// useEffect$(() => {
//   authentication.onLogoutSucceeded$.pipe(
//     tap(() => {
//        // Side effect here
//     })
//   );
// });

// with untilDestroyed() from @ngneat/react-rxjs
//
// useEffect(() => {
//   authentication.onLogoutSucceeded$.pipe(untilDestroyed()).subscribe(() => {
//     // Side effect here
//   });
// }, [navigate, untilDestroyed]);
