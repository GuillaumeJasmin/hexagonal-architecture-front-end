/* import all use-cases */
import './useCases/Authentication/Authentication';
import './useCases/CurrentUser/CurrentUser';

/* the, initialize all use-cases */
import { UseCase } from '../utils';

UseCase.initializeAll();
