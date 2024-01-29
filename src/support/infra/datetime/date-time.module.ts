import { Module } from '@nestjs/common'
import { DateTimeHolder } from './date-time.holder'

@Module({
    providers: DateTimeHolder.PROVIDERS,
    exports: DateTimeHolder.INJECTION_TOKENS,
})
export class DateTimeModule {}
