import { Container } from 'typedi';
import { tokensList } from './Service'

export interface IUseCase {
  initialize(): void;
}

export function initializeUseCases() {
  tokensList.forEach(token => {
    const instance = Container.get<IUseCase>(token);

    if (instance.initialize) {
      instance.initialize();
    }
  });
}