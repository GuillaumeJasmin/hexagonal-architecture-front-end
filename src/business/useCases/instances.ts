import { Container } from 'typedi';
import { authenticationToken } from './Authentication/IAuthentication';
import { currentUserToken } from './CurrentUser/ICurrentUser';

const intancesGetter = {
  currentUser: () => Container.get(currentUserToken),
  authentication: () => Container.get(authenticationToken),
};

type Instances = {
  [Key in keyof typeof intancesGetter]: ReturnType<typeof intancesGetter[Key]>;
};

const instances = new Proxy(
  {} as Instances,
  {
    get(_, prop: keyof Instances) {
      return intancesGetter[prop]();
    },
  }
);

export function useInstances() {
  return instances;
}