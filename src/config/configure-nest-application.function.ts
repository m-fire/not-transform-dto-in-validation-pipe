import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import {
    defaultCorsOptions,
    defaultValidationPipeOptions,
    isPresentEnv,
} from '@src-root/config/index'
import { HttpExceptionFilter } from '@src-support/infra/web/filter'
import { GlobalErrorInterceptor } from '@src-support/infra/web/interceptor'
import { NestApplication } from '@nestjs/core'
import process from 'process'

export async function configureNestApplication(app: INestApplication) {
    app.enableCors(defaultCorsOptions) // 모든제한 허용
    app.useGlobalPipes(new ValidationPipe(defaultValidationPipeOptions))

    app.useGlobalInterceptors(new GlobalErrorInterceptor())
    app.useGlobalFilters(new HttpExceptionFilter())

    const port = isPresentEnv('test') ? 0 : 4100
    if (isNaN(port)) {
        Logger.error('No port provided. 👏', NestApplication.name)
        process.exit(666)
    }
    await app.listen(port, async () =>
        Logger.log(
            'Server started at ' +
                (await app.getUrl()).replace('[::1]', 'localhost'),
            NestApplication.name,
        ),
    )
    return app
}
