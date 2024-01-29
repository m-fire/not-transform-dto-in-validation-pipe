import { SystemDateTimeHolder } from './system-date-time.holder'
import { ClassProvider, InjectionToken } from '@nestjs/common'

export abstract class DateTimeHolder {
    static readonly SYSTEM = SystemDateTimeHolder.name

    static readonly PROVIDERS: ClassProvider<DateTimeHolder>[] = [
        { provide: DateTimeHolder.SYSTEM, useClass: SystemDateTimeHolder },
    ]
    static readonly INJECTION_TOKENS: InjectionToken[] =
        DateTimeHolder.PROVIDERS.map((p) => p.provide)

    abstract milliSeconds(): number
}
