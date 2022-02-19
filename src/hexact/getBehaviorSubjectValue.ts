import { Observable } from 'rxjs';

export function getBehaviorSubjectValue<T>(observable$: Observable<T>): T {
  let initialValue: T | undefined = undefined;

  observable$
    .subscribe((data) => {
      initialValue = data;
    })
    .unsubscribe();

  // @ts-expect-error
  return initialValue;
}
