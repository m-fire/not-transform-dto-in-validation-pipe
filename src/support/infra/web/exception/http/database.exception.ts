import { InternalServerErrorException } from '@nestjs/common'
import { ErrorMessage, Errors } from '@src-support/domain/api/response'
import { Messages } from '@src-support/domain/constant'

export class DatabaseException extends InternalServerErrorException {
    constructor(
        public readonly datasource: any,
        public readonly reason: any | null = null,
        getResponseMessage: (
            defaultMessage: ErrorMessage<'DatabaseError'>,
        ) => string = (msg) => `서버가 응답${Messages.UNABLE}`,
    ) {
        const response: any = Errors.of('DatabaseError')
        response.message = getResponseMessage(response.message)
        super(response, {
            cause: `[${datasource?.name ?? datasource}] ${reason}`,
        })
    }
}
