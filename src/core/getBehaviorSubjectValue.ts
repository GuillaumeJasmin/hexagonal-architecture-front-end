import { Observable } from 'rxjs';

export function getBehaviorSubjectValue<T>(observable$: Observable<T>): T {
  let initialValue: T | undefined;
  let isSubscribed = false;

  observable$
    .subscribe(data => {
      isSubscribed = true;
      initialValue = data;
    })
    .unsubscribe();

  if (!isSubscribed) {
    throw new Error(`observable$ is not a BehaviorSubject`);
  }

  return initialValue as T;
}
