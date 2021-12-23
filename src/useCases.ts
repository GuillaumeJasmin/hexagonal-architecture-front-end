import { getUseCase } from './utils/decorators';
import { IAuthUser } from './useCases/AuthUser';
import { ILocale } from './useCases/Locale';

import './registerUseCase'

export const authUser = getUseCase<IAuthUser>('AuthUser');
export const locale = getUseCase<ILocale>('Locale');
