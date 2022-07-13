import { Token } from 'typedi';

export { Token };

/**
 * Use as base class for use-case
 */
export abstract class UseCase {
  public async initialize() {
    // console.log(`___ initialized ${this.constructor.name}`);
    // ...
  }
}
