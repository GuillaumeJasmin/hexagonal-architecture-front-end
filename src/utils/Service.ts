import { Service as ServiceBase, Token } from 'typedi';

export function Service<T extends string>(token: Token<T>) {
  // Use to test the real behavior use-case
  // We use transient: true on unit test in order to get a new instance between each it()
  // return ServiceBase({ id: token, transient: process.env.NODE_ENV === 'test' });
  return ServiceBase({ id: token });
}

export function ServiceTest<T extends string>(token: Token<T>) {
  // Use to simulate dependencies
  return ServiceBase({ id: token });
}
