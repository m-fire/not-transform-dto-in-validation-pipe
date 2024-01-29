import { forwardRef, Module } from '@nestjs/common'
import { JwtAuthStrategy } from './jwt-auth.strategy'
import { PassportModule } from '@nestjs/passport'
import { SignUpUserApi } from './feature/sign-up-user.api'
import { SignInUserApi } from './feature/sign-in-user.api'
import { DataAccessModule } from '@src-root/module'
import { JwtModule } from '@nestjs/jwt'
import {
    defaultJwtAuthModuleOptions,
    defaultJwtModuleOptions,
} from '@src-root/config'

@Module({
    imports: [
        PassportModule.register(defaultJwtAuthModuleOptions),
        JwtModule.register(defaultJwtModuleOptions),
        forwardRef(() => DataAccessModule), // AppModule 에 이미 포함되어 forwardRef 로 순환종속성 해결
    ],
    controllers: [/* AuthController, */ SignUpUserApi, SignInUserApi],
    providers: [JwtAuthStrategy /* AuthService */],
    exports: [JwtAuthStrategy],
})
export class AuthModule {}
