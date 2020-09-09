import axios, { AxiosInstance } from 'axios'
import { INotification } from 'src/core/useCases/Notification/INotification'

export class HTTP {
  axiosInst: AxiosInstance

  constructor(private notification: INotification) {
    this.axiosInst = axios.create({
      baseURL: 'http://api.domain.com'
    })

    this.axiosInst.interceptors.response.use(
      response => response,
      (error) => {
        if (error?.response?.status === 401) {
          this.notification.publishError('UNAUTHORIZED')
        } else {
          throw error
        }
      },
    )
  }
}
