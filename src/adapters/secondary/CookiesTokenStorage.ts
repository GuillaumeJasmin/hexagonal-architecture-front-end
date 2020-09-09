import cookies from 'js-cookie'
import { ITokenStorage } from 'src/core/ports/ITokenStorage'

export class CookiesTokenStorage implements ITokenStorage {
  tokenKey = 'auth_user_token'

  getToken() {
    return cookies.get(this.tokenKey) || null
  }

  setToken(token: string) {
    cookies.set(this.tokenKey, token)
  }

  removeToken() {
    cookies.remove(this.tokenKey)
  }
}
