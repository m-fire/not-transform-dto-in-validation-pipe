import { forwardRef, Module } from '@nestjs/common'
import { defaultServeStaticModuleOptions, multerModule } from '@src-root/config'
import { DataAccessModule } from '@src-root/module'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
    imports: [
        multerModule, // file upload features
        ServeStaticModule.forRoot(defaultServeStaticModuleOptions), // static resources config
        forwardRef(() => DataAccessModule), // AppModule 에 이미 포함되어 forwardRef 로 순환종속성 해결
    ],
    controllers: [
        /* FileController, */
    ],
    providers: [
        /* FileService, */
    ],
})
export class FileModule {}
