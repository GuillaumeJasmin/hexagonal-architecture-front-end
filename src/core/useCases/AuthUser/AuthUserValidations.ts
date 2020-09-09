import validator from 'validator'
import { ValidationsError } from './AuthUserState'

export class AuthUserValidations {
  validateLogin(data: { email: string; password: string }) {
    if (!data.email) {
      return {
        email: ValidationsError.REQUIRED
      }
    }

    if (!validator.isEmail(data.email)) {
      return {
        email: ValidationsError.INVALID_EMAIL
      }
    }

    if (!data.password) {
      return {
        password: ValidationsError.REQUIRED
      }
    }
  }
}
