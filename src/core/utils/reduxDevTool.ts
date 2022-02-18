import { createStore, compose } from 'redux';
import { Observable, take, skip } from 'rxjs';

// @ts-expect-error
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? // @ts-expect-error
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

function rootReducer(state: any = {}, action: any) {
  return {
    ...state,
    [action.useCaseName]: action.nextState,
  }
}

const store = createStore(rootReducer, {}, composeEnhancers());

export function reduxDevTool(
  useCaseName: string,
  state$: Observable<any>
) {
  state$.pipe(take(1)).subscribe((nextState) => {
    const date = new Date().toLocaleString();

    store.dispatch({
      type: `@INIT ${useCaseName} - ${date}`,
      useCaseName,
      nextState,
    });
  });

  state$.pipe(skip(1)).subscribe((nextState) => {
    const date = new Date().toLocaleString();

    store.dispatch({
      type: `${useCaseName} - ${date}`,
      useCaseName,
      nextState,
    });
  });
}
