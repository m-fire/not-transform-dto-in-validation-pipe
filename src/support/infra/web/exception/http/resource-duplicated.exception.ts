import { BadRequestException } from '@nestjs/common'
import { ErrorMessage, Errors } from '@src-support/domain/api/response'

export class ResourceDuplicatedException extends BadRequestException {
    constructor(
        public readonly datasource: any,
        public readonly reason: any | null = null,
        getResponseMessage: (
            defaultMessage: ErrorMessage<'Duplicated'>,
        ) => string = (msg) => msg,
    ) {
        const response: any = Errors.of('Duplicated')
        response.message = getResponseMessage(response.message)
        super(response, {
            cause: `[${datasource?.name ?? datasource}] ${reason}`,
        })
    }
}
