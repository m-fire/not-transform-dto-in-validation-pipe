import { Module } from '@nestjs/common'
import {
    AuthModule,
    BoardModule,
    DataAccessModule,
    FileModule,
    UserModule,
} from './module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UniqueIdModule } from '@src-support/infra/unique-id'
import { DateTimeModule } from '@src-support/infra/datetime'
import { createPgMemDataSource } from '@src-root/config'

@Module({
    imports: [
        // App 에서 사용될 모듈 추가
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                migrationsRun: false,
            }),
            async dataSourceFactory() {
                return createPgMemDataSource()
            },
        }),
        AuthModule,
        BoardModule,
        UserModule,
        FileModule,
        DataAccessModule,
        UniqueIdModule,
        DateTimeModule,
    ],
    controllers: [
        /* AppController, */
    ], // equal 'express Router'
    providers: [
        /* AppService, */
    ],
})
export class AppModule {}
