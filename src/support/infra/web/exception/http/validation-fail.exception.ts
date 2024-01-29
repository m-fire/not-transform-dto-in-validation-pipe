import { BadRequestException } from '@nestjs/common'
import { ErrorMessage, Errors } from '@src-support/domain/api/response'

export class ValidationFailException extends BadRequestException {
    constructor(
        public readonly datasource: any,
        public readonly errors: Record<string, any> = {},
        public readonly reason: any | null = null,
        getResponseMessage: (
            defaultMessage: ErrorMessage<'ValidationFail'>,
        ) => string = (msg) => msg,
    ) {
        const response: any = {
            ...Errors.of('ValidationFail'),
            errors,
        }
        response.message = getResponseMessage(response.message)
        super(response, {
            cause: `[${datasource?.name ?? datasource}] ${Object.entries(
                errors,
            )}`,
        })
    }
}
