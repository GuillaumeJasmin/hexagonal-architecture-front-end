import { Container } from 'typedi';
import { getContainerInstances } from './Registry/getContainerInstances';

interface IUseCase {
  initialize(): void;
}

export function initializeUseCases() {
  getContainerInstances().forEach((metadata) => {
    // @ts-expect-error conflict with id and token type
    const instance = Container.get<IUseCase>(metadata.id);

    if (instance.initialize) {
      instance.initialize();
    }
  });
}
