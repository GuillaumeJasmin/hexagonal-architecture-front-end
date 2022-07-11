import { Token } from "typedi";

export interface IAuthenticationApi {
  login(data: { email: string; password: string }): Promise<{ userId: string }>;
  logout(): Promise<void>;
}

export const authenticationApiToken = new Token<IAuthenticationApi>('AuthenticationApi');