import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { authorizationToLoginPayLoad } from 'src/utils/base-64-converter';

export const UserId = createParamDecorator(
    (_, ctx: ExecutionContext) => {
        const { authorization } = ctx.switchToHttp().getRequest().headers;

        const loginPayLoad = authorizationToLoginPayLoad(authorization)

        return loginPayLoad?.id
    }
)