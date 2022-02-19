import 'reflect-metadata';
import { setService } from '../../../services/tools';
import { getUseCase, setUseCase } from '../tools';
import { AuthenticationApiTest } from '../../../services/AuthenticationApi/AuthenticationApiTest';
import { CurrentUserTest } from '../../useCases/CurrentUser/CurrentUserTest';
import './Authentication';
import { Observable } from 'rxjs';

function spySubscribe(obs$: Observable<any>) {
  const subscription = jest.fn();

  obs$.subscribe(subscription);

  return subscription;
}

describe('UseCase - Authentication', () => {
  it('should submit login', async () => {
    const authenticationService = setService(
      'Authentication',
      new AuthenticationApiTest()
    );
    const currentUserUseCase = setUseCase('CurrentUser', new CurrentUserTest());
    const authenticationUseCase = getUseCase('Authentication');

    const isLoggingSubscription = spySubscribe(
      authenticationUseCase.isLogging$
    );

    authenticationService.login.mockResolvedValue({ userId: 'abc' });

    await authenticationUseCase.login({
      email: 'john.doe@email.com',
      password: 'abc',
    });

    expect(isLoggingSubscription).toHaveBeenNthCalledWith(1, false);
    expect(isLoggingSubscription).toHaveBeenNthCalledWith(2, true);
    expect(isLoggingSubscription).toHaveBeenNthCalledWith(3, false);
    expect(isLoggingSubscription).toHaveBeenCalledTimes(3);

    expect(authenticationService.login).toHaveBeenCalledTimes(1);
    expect(authenticationService.login).toHaveBeenCalledWith({
      email: 'john.doe@email.com',
      password: 'abc',
    });

    expect(currentUserUseCase.fetchUserById).toHaveBeenCalledTimes(1);
    expect(currentUserUseCase.fetchUserById).toHaveBeenNthCalledWith(1, {
      userId: 'abc',
    });
  });
});
