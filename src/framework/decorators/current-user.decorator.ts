import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { CurrentUser } from '../model/current-user.model';

export const ReqCurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<any>();
    const currentUser = request.user as CurrentUser;
    if (!currentUser) return undefined;
    return currentUser;
  },
);
