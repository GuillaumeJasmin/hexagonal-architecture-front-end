import Container from 'typedi';
import { getContainerInstances } from './getContainerInstances';
import { UseCase } from './UseCase';

export function resetAllInstances() {
  getContainerInstances().forEach((instance) => {
    if (instance.value instanceof UseCase) {
      if (instance.type) {
        // @ts-expect-error
        console.log(`___ Reset instance: ${instance.id.name}`);
        Container.remove(instance.id);
        Container.set({ id: instance.id, type: instance.type });
      } else {
        throw new Error(`UseCaseToken should be instanciate with 'type' consturctor`);
      }
    }
  });
}
