interface User {
  id: string;
  name: string;
  email: string;
}

export interface IUserApi {
  fetchUserById(data: { userId: string }): Promise<User>
}
