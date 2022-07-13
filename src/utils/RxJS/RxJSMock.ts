import { BehaviorSubject, Subject, ObservedValueOf } from 'rxjs';

class MockBehaviorSubject<T> extends BehaviorSubject<ObservedValueOf<T>> {
  private valueIsSet = false;

  private debugMessage?: string = '';

  mockNextValue(value: ObservedValueOf<T>) {
    this.valueIsSet = true;

    this.next(value);
  }

  subscribe: BehaviorSubject<ObservedValueOf<T>>['subscribe'] = (...args) => {
    if (!this.valueIsSet) {
      throw new Error(
        `MockBehaviorSubject: value not set - ${this.debugMessage}`
      );
    }

    // @ts-expect-error Override
    return super.subscribe(...args);
  };

  constructor(debugMessage?: string) {
    // @ts-expect-error because BehaviorSubject need an initial value
    super(undefined);

    this.debugMessage = debugMessage;
  }
}

class MockSubject<T> extends Subject<ObservedValueOf<T> | undefined> {
  mockNext(value?: ObservedValueOf<T>) {
    this.next(value);
  }
}

export function mockBehaviorSubject<T>(debugMessage?: string) {
  return new MockBehaviorSubject<T>(debugMessage);
}

export function mockSubject<T>() {
  return new MockSubject<T>();
}

export function mockFn<T extends (...args: any[]) => any>() {
  return jest.fn<ReturnType<T>, Parameters<T>>();
}
