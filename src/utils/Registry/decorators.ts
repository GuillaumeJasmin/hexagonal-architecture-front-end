import { Service as ServiceBase, Inject, Token } from 'typedi';

export function Service<T extends string>(token: Token<T>) {
  // We use transient: true on unit test in order to get a new instance between each it()
  return ServiceBase({ id: token, transient: process.env.NODE_ENV === 'test' });
}

export { Token, Inject };
