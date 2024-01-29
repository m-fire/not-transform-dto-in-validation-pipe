import {
    CallHandler,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Logger,
    NestInterceptor,
} from '@nestjs/common'
import { catchError, Observable } from 'rxjs'
import { TypeORMError } from 'typeorm'
import { DatabaseException } from '@src-support/infra/web/exception'
import { Errors } from '@src-support/domain/api/response'

export class GlobalErrorInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof TypeORMError) {
                    throw new DatabaseException(context.getType(), error.stack)
                }

                if (error instanceof HttpException) throw error

                Logger.error(error.message, error.stack, context.getType())
                throw new HttpException(
                    Errors.of('NotAllowed'),
                    HttpStatus.FORBIDDEN,
                )
            }),
        )
    }
}
