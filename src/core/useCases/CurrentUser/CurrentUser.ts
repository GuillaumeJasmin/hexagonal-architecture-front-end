import { Store } from '../../utils/Store';
import type { IUserApi } from '../../../services/UserApi/IUserApi';
import { ICurrentUser, CurrentUserState } from './ICurrentUser';
import { RegisterUseCase } from '../tools';
import { InjectService } from '../../../services/tools';

const initialCurrentUserState: CurrentUserState = {
  user: null,
};

@RegisterUseCase('CurrentUser')
export class CurrentUser extends Store<CurrentUserState> implements ICurrentUser {
  @InjectService('User')
  protected userApi!: IUserApi;
  
  public user$ = this.select((state) => state.user);

  constructor() {
    super(initialCurrentUserState);
  }

  public async fetchUserById(data: { userId: string }) {
    try {
      const user = await this.userApi.fetchUserById(data);
      this.setState({ user });
    } catch (error: unknown) {
      throw new Error('error');
    }
  }
}
