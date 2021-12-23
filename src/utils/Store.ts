import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';
import { reduxDevTool } from './reduxDevTool';

function distinctUntilObjectValuesChanged<T extends Record<string, any>>() {
  return distinctUntilChanged((previous: T, current: T) => {
    const propertiesAreNotEqual = Object.keys(current).some(
      (key) => current[key] === previous[key]
    );

    return propertiesAreNotEqual;
  });
}

export class Store<State extends Record<string, any>> {
  private store = new BehaviorSubject<State>(this.state);

  public readonly state$ = this.store
    .asObservable()
    .pipe(distinctUntilObjectValuesChanged());

  constructor(private state: State) {
    reduxDevTool(this.constructor.name, this.store);
  }

  protected setState(
    nextPartialState: Partial<State> | ((state: State) => Partial<State>)
  ) {
    this.state =
      typeof nextPartialState === 'function'
        ? { ...this.state, ...nextPartialState(this.state) }
        : { ...this.state, ...nextPartialState };

    this.store.next(this.state);
  }

  // __Experimental
  // protected select<T>(fn: (state: State) => T) {
  //   return this.state$.pipe(map((state) => fn(state)));
  // }

  getState() {
    return this.state;
  }
}
