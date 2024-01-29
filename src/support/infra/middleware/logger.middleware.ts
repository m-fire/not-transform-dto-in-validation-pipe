import { NextFunction, Request, Response } from 'express'
import { Injectable, Logger, NestMiddleware } from '@nestjs/common'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl } = request
        const userAgent = request.get('user-agent') || ''

        response.on('finish', () => {
            const { statusCode } = response
            const contentLength = response.get('content-length')

            Logger.log(
                `${method} [${statusCode}] ${originalUrl} | ${contentLength}`,
                `${userAgent}-${ip}`,
            )
        })
        next()
    }
}
