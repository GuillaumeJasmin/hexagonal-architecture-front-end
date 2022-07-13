import { Container } from 'typedi';
import { mockFn, ServiceTest } from '../../../utils';
import type { ITokenStorage } from './ITokenStorage';
import { tokenStorageToken } from './ITokenStorage';

@ServiceTest(tokenStorageToken)
export class TokenStorageTest implements ITokenStorage {
  getToken = mockFn<ITokenStorage['getToken']>();

  setToken = mockFn<ITokenStorage['setToken']>();

  removeToken = mockFn<ITokenStorage['removeToken']>();
}

export function resetAndGetTokenStorage() {
  Container.set(tokenStorageToken, new TokenStorageTest());

  return Container.get<TokenStorageTest>(tokenStorageToken);
}
