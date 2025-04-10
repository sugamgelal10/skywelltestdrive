import { applyDecorators, SetMetadata } from '@nestjs/common';
import { Auth } from 'src/iam/auth/decorator/auth.decorator';
import { AuthType } from 'src/iam/auth/enums/auth-type.enum';
import { UserRole } from 'src/user/entities/user.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => {
  return applyDecorators(
    Auth(roles.length !== 0 ? AuthType.Bearer : AuthType.None),
    SetMetadata(ROLES_KEY, roles),
  );
};
