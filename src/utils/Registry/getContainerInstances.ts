import { Container, ServiceMetadata } from 'typedi';

export function getContainerInstances<Instance extends ServiceMetadata>(): Instance[] {
  // @ts-expect-error
  return Container.globalInstance.services;
}