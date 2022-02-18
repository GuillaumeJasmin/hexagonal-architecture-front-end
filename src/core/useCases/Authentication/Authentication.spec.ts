import 'reflect-metadata';
import { setService } from '../../../services/tools';
import { getUseCase } from '../tools';
// import '../../../services/registerServicesTests';
import { AuthenticationApiTest } from '../../../services/AuthenticationApi/AuthenticationApiTest';
import '../registerUseCaseTest';
import './Authentication';
import { Observable } from 'rxjs';

function spySubscribe(obs$: Observable<any>) {
  const subscription = jest.fn();

  obs$.subscribe(subscription);

  return subscription;
}

describe('UseCase - Authentication', () => {
  it('should submit login', async () => {
    const AuthenticationService = setService(
      'Authentication',
      new AuthenticationApiTest()
    );
    const AuthenticationUseCase = getUseCase('Authentication');

    const isLoggingSubscription = spySubscribe(
      AuthenticationUseCase.isLogging$
    );

    AuthenticationService.login.mockResolvedValue({
      userId: 'abc',
    });

    expect(true).toBe(true);

    const loginPromise = AuthenticationUseCase.login({
      email: 'john.doe@email.com',
      password: 'abc',
    });

    expect(isLoggingSubscription).toHaveBeenNthCalledWith(1, true);

    await loginPromise;

    expect(isLoggingSubscription).toHaveBeenNthCalledWith(1, false);

    // expect(AuthenticationService.login).toHaveBeenCalledTimes(1);
    // expect(AuthenticationService.login).toHaveBeenCalledWith({
    //   email: 'john.doe@email.com',
    //   password: 'abc',
    // });
    // expect(userSubscription).toHaveBeenCalledWith({
    //   email: 'john.doe@email.com',
    //   name: 'John',
    //   defaultLanguage: 'fr',
    // });
  });
});
