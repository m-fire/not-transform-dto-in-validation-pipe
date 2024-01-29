import { UnauthorizedException } from '@nestjs/common'
import { ErrorMessage, Errors } from '@src-support/domain/api/response'

export class SignInFailException extends UnauthorizedException {
    constructor(
        public readonly datasource: any,
        public readonly reason: any | null = null,
        getResponseMessage: (
            defaultMessage: ErrorMessage<'SignInFail'>,
        ) => string = (msg) => msg,
    ) {
        const response: any = Errors.of('SignInFail')
        response.message = getResponseMessage(response.message)
        super(response, {
            cause: `[${datasource?.name ?? datasource}] ${reason}`,
        })
    }
}
