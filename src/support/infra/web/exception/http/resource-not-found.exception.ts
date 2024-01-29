import { BadRequestException } from '@nestjs/common'
import { ErrorMessage, Errors } from '@src-support/domain/api/response'

export class ResourceNotFoundException extends BadRequestException {
    constructor(
        public readonly datasource: any,
        public readonly reason: any | null = null,
        getResponseMessage: (
            defaultMessage: ErrorMessage<'NotFound'>,
        ) => string = (msg) => msg,
    ) {
        const response: any = Errors.of('NotFound')
        response.message = getResponseMessage(response.message)
        super(response, {
            cause: `[${datasource?.name ?? datasource}] ${reason}`,
        })
    }
}
