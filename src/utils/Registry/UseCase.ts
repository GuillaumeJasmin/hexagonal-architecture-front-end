import { Container } from './Container';
import { Token } from './decorators';

/**
 * Use as base class for use-case
 */
export abstract class UseCase {
  static initializeAll() {
    Container.getInstances().forEach((metadata) => {
      const instance = Container.get<UseCase>(metadata.id as Token<UseCase>);

      if (instance instanceof UseCase) {
        instance.initialize();
      }
    });
  }

  public async initialize() {
    // console.log(`___ initialized ${this.constructor.name}`);
  }
}
