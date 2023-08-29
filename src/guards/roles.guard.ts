import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { LoginPayLoad } from '../auth/dtos/loginpayLoad.dto'
import { ROLES_KEY } from '../decorators/roles.decoractors'
import { UserType } from '../user/enum/use-type.enum'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly jwtService: JwtService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requireRoles = this.reflector.getAllAndOverride<UserType[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        )

        if (!requireRoles) {
            return true
        }

        const { authorization } = context.switchToHttp().getRequest().headers

        const loginPayLoad: LoginPayLoad | undefined = await this.jwtService
            .verifyAsync(authorization, {
                secret: process.env.JWT_SECRET
            })
            .catch(() => undefined)

        if (!loginPayLoad) {
            return false
        }


        
        return requireRoles.some((role) => role === loginPayLoad.typeUser)
    }

}

