import { mockFn } from '../../../utils';
import type { ITokenStorage } from './ITokenStorage';

export class TokenStorageTest implements ITokenStorage {
  getToken = mockFn<ITokenStorage['getToken']>();

  setToken = mockFn<ITokenStorage['setToken']>();

  removeToken = mockFn<ITokenStorage['removeToken']>();
}

export { tokenStorageToken } from './ITokenStorage';
