import { Observable } from 'rxjs'

export interface INotification {
  onError$: Observable<string>,
  publishError(error: string): void;
}
