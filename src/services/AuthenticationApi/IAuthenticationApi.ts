export interface IAuthenticationApi {
  login(data: { email: string; password: string }): Promise<{ userId: string }>
}
