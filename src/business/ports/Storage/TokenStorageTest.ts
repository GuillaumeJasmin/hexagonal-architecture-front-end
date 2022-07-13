import { Container } from 'typedi';
import { mockFn, ServiceTest } from '../../../utils';
import type { ITokenStorage } from './ITokenStorage';
import { tokenStorageToken } from './ITokenStorage';

export { tokenStorageToken } from './ITokenStorage';

@ServiceTest(tokenStorageToken)
export class TokenStorageTest implements ITokenStorage {
  getToken = mockFn<ITokenStorage['getToken']>();

  setToken = mockFn<ITokenStorage['setToken']>();

  removeToken = mockFn<ITokenStorage['removeToken']>();
}

export function getTokenStorageTest() {
  return Container.get<TokenStorageTest>(tokenStorageToken);
}
