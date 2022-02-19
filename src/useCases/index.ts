import { getUseCase } from '../hexactInstance';

export const currentUser = getUseCase('CurrentUser');
export const authentication = getUseCase('Authentication');