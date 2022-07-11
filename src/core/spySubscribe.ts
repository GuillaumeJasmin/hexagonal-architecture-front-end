import { Observable } from 'rxjs';

export function spySubscribe(obs$: Observable<any>) {
  const subscription = jest.fn();

  obs$.subscribe(subscription);

  const expectSubscription = {
    toHaveEmittedValues(...values: any[]) {
      expect(subscription).toHaveBeenCalledTimes(values.length);
      values.forEach((value, index) => {
        expect(subscription).toHaveBeenNthCalledWith(index + 1, value);
      });
    },
  };

  // @ts-expect-error
  subscription.expect = expectSubscription;

  return subscription as jest.Mock & { expect: typeof expectSubscription };
}
