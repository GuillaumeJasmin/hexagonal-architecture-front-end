interface User {
  name: string;
  email: string;
  defaultLanguage: 'en' | 'fr';
}

export interface IAuthUserApi {
  fetchUser(): Promise<User>;
}
