import { Service, Token } from 'typedi';

export const tokensList: Token<string>[] = [];

export function UseCase<T extends string>(token: Token<T>) {
  tokensList.push(token);

  // Use to test the real behavior use-case
  // We use transient: true on unit test in order to get a new instance between each it()
  return Service({ id: token, transient: process.env.NODE_ENV === 'test' });
}

/**
 * @deprecated No longer use because of reset data
 */
export function UseCaseTest<T extends string>(token: Token<T>) {
  tokensList.push(token);

  // Use to simulate dependencies
  return Service({ id: token });
}
