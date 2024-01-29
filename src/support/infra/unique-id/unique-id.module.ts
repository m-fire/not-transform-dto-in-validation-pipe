import { Module } from '@nestjs/common'
import { UniqueIdHolder } from './unique-id.holder'

@Module({
    providers: UniqueIdHolder.PROVIDERS,
    exports: UniqueIdHolder.INJECTION_TOKENS,
})
export class UniqueIdModule {}
