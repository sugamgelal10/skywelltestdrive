import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserData } from '../../interface/active-user-data.interface';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserData | undefined = request[REQUEST_USER_KEY];

    return field ? user?.[field] : user;
  },
);
