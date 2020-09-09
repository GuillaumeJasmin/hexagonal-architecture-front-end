import { ITokenStorage } from '../ports/ITokenStorage'

export class TestTokenStorage implements ITokenStorage {
  getToken = jest.fn()

  setToken = jest.fn()

  removeToken = jest.fn()
}
