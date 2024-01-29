import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { configureNestApplication } from '@src-root/config'

declare const module: any /* Code for WebPack’s HMR function */

/**
 * Spring Boot Application 과 역할이 동일함
 * @returns {Promise<void>}
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)

    await configureNestApplication(app)

    // HMR settings of WebPack
    if (module.hot) {
        module.hot.accept()
        module.hot.dispose(() => app.close())
    }
}

bootstrap()
