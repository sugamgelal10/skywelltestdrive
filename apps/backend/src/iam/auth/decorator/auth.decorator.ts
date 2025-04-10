import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-type.enum';

export const AUTH_TYPE_KEY = 'auth_type';

export const Auth = (...authTypes: AuthType[]) => {
  return SetMetadata(AUTH_TYPE_KEY, authTypes);
};
