import { from } from 'rxjs'
import { IAuthUserGateway, AuthUserErrorUnauthenticated } from 'src/core/useCases/AuthUser'
import { HTTP } from './HTTP'

export class HTTPAuthUserGateway extends HTTP implements IAuthUserGateway {
  login(data: { email: string; password: string }) {
    return from(
      this.axiosInst
        .request({
          url: '/users/login',
          method: 'POST',
          data,
        })
        .then((res) => {
          return {
            token: res.data.token,
            user: {
              id: res.data.id,
              email: res.data.email,
              role: res.data.role,
            }
          }
        })
        .catch(error => {
          if (error.status === 401) {
            throw new AuthUserErrorUnauthenticated()
          }

          throw error
        })
    )
  }

  logout() {
    return from(
      this.axiosInst
        .request({
          url: '/users/logout',
          method: 'POST',
        })
        .then(() => null)
    )
  }
}
