import { InternalServerErrorException } from '@nestjs/common'
import { ErrorMessage, Errors } from '@src-support/domain/api/response'

export class ResourceNotAllowedException extends InternalServerErrorException {
    constructor(
        public readonly datasource: any,
        public readonly reason: any | null = null,
        getResponseMessage: (
            defaultMessage: ErrorMessage<'NotAllowed'>,
        ) => string = (msg) => msg,
    ) {
        const response: any = Errors.of('NotAllowed')
        response.message = getResponseMessage(response.message)
        super(response, {
            cause: `[${datasource?.name ?? datasource}] ${reason}`,
        })
    }
}
