import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Logger,
} from '@nestjs/common'
import { ApiResponse } from '@src-support/domain/api/response'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context: HttpArgumentsHost = host.switchToHttp()
        context
            .getResponse()
            .status(exception.getStatus())
            .json(ApiResponse.failOf(exception.getResponse()))
        Logger.error(
            `${exception.name}: ${exception.message}`,
            exception.cause,
            HttpExceptionFilter.name,
        )
    }
}
