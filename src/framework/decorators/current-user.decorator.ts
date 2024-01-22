/* v8 ignore start */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { CurrentUser } from '../model/current-user.model';

interface CustomRequest extends Request {
  user?: CurrentUser;
}

export const ReqCurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<CustomRequest>();
    const currentUser = request?.user;
    if (!currentUser) return undefined;
    return currentUser;
  },
);
/* v8 ignore stop */
