import { Container as BaseContainer, ServiceMetadata } from 'typedi';

export class Container extends BaseContainer {
  public static getInstances(): ServiceMetadata[] {
    // @ts-expect-error typedi package has a private globalInstance
    return Container.globalInstance.services;
  }
}