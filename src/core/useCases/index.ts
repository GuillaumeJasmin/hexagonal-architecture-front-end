import { getUseCase } from './tools';

export const currentUser = getUseCase('CurrentUser');
export const authentication = getUseCase('Authentication');