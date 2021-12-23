import { BehaviorSubject } from 'rxjs'

export class Store<State> {
  private store = new BehaviorSubject<State>(this.state);

  public readonly state$ = this.store.asObservable();

  constructor(private state: State) {}

  protected setState(nextPartialState: Partial<State> | ((state: State) => Partial<State>)) {
    this.state = typeof nextPartialState === 'function'
      ? { ...this.state, ...nextPartialState(this.state) }
      : { ...this.state, ...nextPartialState }
    this.store.next(this.state)
  }

  getState() {
    return this.state
  }
}
