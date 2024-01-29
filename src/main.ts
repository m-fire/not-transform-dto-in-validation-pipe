import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { configureNestApplication } from '@src-root/config'

/**
 * Spring Boot Application 과 역할이 동일함
 * @returns {Promise<void>}
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)

    await configureNestApplication(app)
}
bootstrap()
