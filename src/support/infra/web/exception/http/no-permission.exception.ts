import { ForbiddenException } from '@nestjs/common'
import { ErrorMessage, Errors } from '@src-support/domain/api/response'

export class NoPermissionException extends ForbiddenException {
    constructor(
        public readonly datasource: any,
        public readonly reason: any | null = null,
        getResponseMessage: (
            defaultMessage: ErrorMessage<'NoPermission'>,
        ) => string = (msg) => msg,
    ) {
        const response: any = Errors.of('NoPermission')
        response.message = getResponseMessage(response.message)
        super(response, {
            cause: `[${datasource?.name ?? datasource}] ${reason}`,
        })
    }
}
