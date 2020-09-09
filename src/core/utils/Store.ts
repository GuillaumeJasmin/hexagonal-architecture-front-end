import { BehaviorSubject } from 'rxjs'

export class Store<State> {
  private store = new BehaviorSubject<State>(this.state);

  public state$ = this.store.asObservable();

  constructor(private state: State) {}

  protected setState(nextPartialState: Partial<State>) {
    this.state = { ...this.state, ...nextPartialState }
    this.store.next(this.state)
  }

  getState() {
    return this.state
  }
}
