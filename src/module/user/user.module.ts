import { forwardRef, Module } from '@nestjs/common'
import { DataAccessModule } from '@src-root/module'

@Module({
    imports: [
        forwardRef(() => DataAccessModule), // AppModule 에 이미 포함되어 forwardRef 로 순환종속성 해결
    ],
    controllers: [
        /* UserController, */
    ],
    providers: [
        /* UserService, */
    ],
})
export class UserModule {}
