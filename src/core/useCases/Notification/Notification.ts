import { Subject } from 'rxjs'
import { INotification } from './INotification'

export class Notification implements INotification {
  private onErrorsSubject$ = new Subject<string>()

  onError$ = this.onErrorsSubject$.asObservable()

  publishError(error: string) {
    this.onErrorsSubject$.next(error)
  }
}
