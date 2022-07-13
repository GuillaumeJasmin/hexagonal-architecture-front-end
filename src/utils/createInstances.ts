import { Container, Token } from 'typedi';

type InstanceFromToken<U> = U extends Token<infer T> ? T : never;

type InstancesOutput<T> = {
  [Key in keyof T]: InstanceFromToken<T[Key]>;
};

export function createInstances<T extends Record<any, any>>(
  instancesGetter: T
): InstancesOutput<T> {
  return new Proxy({} as InstancesOutput<T>, {
    get(_, prop: keyof T) {
      return Container.get(instancesGetter[prop]);
    },
  });
}
