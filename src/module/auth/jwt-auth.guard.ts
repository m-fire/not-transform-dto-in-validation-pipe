import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthorizationFailException } from '@src-support/infra/web/exception'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(
        err: any,
        user: any,
        info: any,
        context: ExecutionContext,
        status?: any,
    ) {
        if (err ?? !user)
            throw (
                err ??
                new AuthorizationFailException(
                    JwtAuthGuard,
                    `user:'${user}', info: ${info}`,
                )
            )
        return user
    }
}
