import { createInstances } from '../../utils';
import { authenticationToken } from './Authentication/IAuthentication';
import { currentUserToken } from './CurrentUser/ICurrentUser';

export const instances = createInstances({
  currentUser: currentUserToken,
  authentication: authenticationToken,
});
