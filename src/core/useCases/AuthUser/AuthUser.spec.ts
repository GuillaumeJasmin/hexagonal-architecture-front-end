import { of, throwError } from 'rxjs'
import { AuthUser } from './AuthUser'
import { IAuthUserGateway } from './IAuthUserGateway'
import { assertsIsDefined } from '../../utils/assertions'
import { TestTokenStorage } from '../../testsAdapters/TestTokenStorage'
import { ValidationsError } from './AuthUserState'
import { AuthUserErrorUnauthenticated } from './AuthUserErrors'

class FakeAuthUserGateway implements IAuthUserGateway {
  loginReturn: ReturnType<IAuthUserGateway['login']> | null = null

  login() {
    assertsIsDefined(this.loginReturn)
    return this.loginReturn
  }

  logout() {
    return of(null)
  }
}

describe('Given user is not authenticated', () => {
  it('should not be logged', () => {
    const authUser = new AuthUser(
      new FakeAuthUserGateway(),
      new TestTokenStorage(),
    )

    const isLoggedSubscription = jest.fn()
    authUser.isLogged$.subscribe(isLoggedSubscription)

    expect(isLoggedSubscription).toHaveBeenCalledTimes(1)
    expect(isLoggedSubscription).toHaveBeenCalledWith(false)
  })

  it('should is logging be false', () => {
    const authUser = new AuthUser(
      new FakeAuthUserGateway(),
      new TestTokenStorage(),
    )

    const isLoggingSubscription = jest.fn()
    authUser.isLogging$.subscribe(isLoggingSubscription)

    expect(isLoggingSubscription).toHaveBeenCalledTimes(1)
    expect(isLoggingSubscription).toHaveBeenCalledWith(false)
  })

  describe('when user login with success', () => {
    const fakeAuthUserGateway = new FakeAuthUserGateway()
    const testTokenStorage = new TestTokenStorage()

    const authUser = new AuthUser(
      fakeAuthUserGateway,
      testTokenStorage,
    )

    const isLoggingSubscription = jest.fn()
    authUser.isLogging$.subscribe(isLoggingSubscription)

    const isLoggedSubscription = jest.fn()
    authUser.isLogged$.subscribe(isLoggedSubscription)

    const userSubscription = jest.fn()
    authUser.user$.subscribe(userSubscription)

    fakeAuthUserGateway.loginReturn = of({
      user: {
        id: '1',
        email: 'john@doe.com',
        role: 'PATIENT',
      },
      token: 'xyz',
    })

    authUser.login({ email: 'john@doe.com', password: 'abc' })

    it('should logging state be true during login request', () => {
      expect(isLoggingSubscription).toHaveBeenNthCalledWith(2, true)
    })

    it('should is logging state be false after login request', () => {
      expect(isLoggingSubscription).toHaveBeenNthCalledWith(3, false)
    })

    it('should be logged', () => {
      expect(isLoggedSubscription).toHaveBeenNthCalledWith(2, true)
      expect(userSubscription).toHaveBeenNthCalledWith(2, {
        id: '1',
        email: 'john@doe.com',
        role: 'PATIENT',
      })
    })

    it('should save token', () => {
      expect(testTokenStorage.setToken).toHaveBeenCalledWith('xyz')
    })
  })

  describe('login validations', () => {
    const fakeAuthUserGateway = new FakeAuthUserGateway()
    fakeAuthUserGateway.loginReturn = of()

    const authUser = new AuthUser(
      fakeAuthUserGateway,
      new TestTokenStorage(),
    )

    const loginErrorsSubscription = jest.fn()
    authUser.loginErrors$.subscribe(loginErrorsSubscription)

    it('should have no error at the beginning', () => {
      expect(loginErrorsSubscription).toHaveBeenCalledTimes(1)
      expect(loginErrorsSubscription).toHaveBeenLastCalledWith(undefined)
    })

    it('should reject email with required error', () => {
      authUser.login({ email: '', password: 'abc' })
      expect(loginErrorsSubscription).toHaveBeenNthCalledWith(2, { email: ValidationsError.REQUIRED })
    })

    it('should reject email with invalid error', () => {
      authUser.login({ email: 'john', password: 'abc' })
      expect(loginErrorsSubscription).toHaveBeenNthCalledWith(3, { email: ValidationsError.INVALID_EMAIL })
    })

    it('should reject password with required error', () => {
      authUser.login({ email: 'john@doe.com', password: '' })
      expect(loginErrorsSubscription).toHaveBeenNthCalledWith(4, { password: ValidationsError.REQUIRED })
    })

    it('should validate all fields', () => {
      authUser.login({ email: 'john@doe.com', password: 'abc' })
      expect(loginErrorsSubscription).toHaveBeenNthCalledWith(5, undefined)
    })
  })

  describe('login errors', () => {
    const fakeAuthUserGateway = new FakeAuthUserGateway()
    fakeAuthUserGateway.loginReturn = throwError(new AuthUserErrorUnauthenticated())

    const authUser = new AuthUser(
      fakeAuthUserGateway,
      new TestTokenStorage(),
    )

    const loginErrorsSubscription = jest.fn()
    authUser.loginErrors$.subscribe(loginErrorsSubscription)

    it('should reject email with bad credentials', () => {
      authUser.login({ email: 'john@doe.com', password: 'abc' })
      expect(loginErrorsSubscription).toHaveBeenNthCalledWith(2, { email: ValidationsError.BAD_CREDENTIALS })
    })
  })
})
