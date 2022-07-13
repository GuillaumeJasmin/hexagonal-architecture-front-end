import { Container } from 'typedi';
import { tokensList } from './Service';

export interface IUseCase {
  initialize(): void;
}

export function initializeUseCases() {
  tokensList.forEach((token) => {
    try {
      const instance = Container.get<IUseCase>(token);

      if (instance.initialize) {
        instance.initialize();
      }
    } catch (e) {
      console.error(`Error during initialization of ${token.name} use-case`);
      throw e;
    }
  });
}
