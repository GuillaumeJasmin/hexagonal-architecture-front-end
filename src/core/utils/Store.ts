import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
} from 'rxjs';
import { getBehaviorSubjectValue } from './getBehaviorSubjectValue';
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
  private readonly store$ = new BehaviorSubject<State>(this.initialState);

  protected get state() {
    return this.store$.getValue();
  }

  public readonly state$ = this.store$
    .asObservable()
    .pipe(
      distinctUntilObjectValuesChanged(),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

  constructor(private initialState: State) {
    reduxDevTool(this.constructor.name, this.store$);
  }

  protected setState(
    nextPartialState: Partial<State> | ((state: State) => Partial<State>)
  ) {
    const nextState =
      typeof nextPartialState === 'function'
        ? { ...this.state, ...nextPartialState(this.state) }
        : { ...this.state, ...nextPartialState };

    this.store$.next(nextState);
  }

  // __Experimental
  protected select<T>(mapFn: (state: State) => T) {
    return this.state$.pipe(map((state) => mapFn(state)));
  }

  /**
   * @deprecated use this.state instead
   */
  getState() {
    return this.state;
  }

  getBehaviorSubjectValue<T>(observable: Observable<T>) {
    return getBehaviorSubjectValue(observable);
  }
}