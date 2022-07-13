import { Token } from 'typedi';

export interface ITokenStorage {
  getToken(): string | null;
  setToken(token: string): void;
  removeToken(): void;
}

export const tokenStorageToken = new Token<ITokenStorage>('TokenStorage');
