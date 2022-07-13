import { ITokenStorage, tokenStorageToken } from '../../business/ports/Storage/ITokenStorage';
import { Service } from '../../utils';

@Service(tokenStorageToken)
export class TokenStorage implements ITokenStorage {
  private tokenKey = 'authToken';

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
