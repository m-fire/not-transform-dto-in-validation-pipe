import { UlidHolder, UuidV4Holder } from './unique-id-holders'
import { ClassProvider, InjectionToken } from '@nestjs/common'

export abstract class UniqueIdHolder {
    static readonly ULID = UlidHolder.name
    static readonly UUID_V4 = UuidV4Holder.name

    static PROVIDERS: ClassProvider<UniqueIdHolder>[] = [
        { provide: UniqueIdHolder.ULID, useClass: UlidHolder },
        { provide: UniqueIdHolder.UUID_V4, useClass: UuidV4Holder },
    ]
    static INJECTION_TOKENS: InjectionToken[] = UniqueIdHolder.PROVIDERS.map(
        (p) => p.provide,
    )

    abstract random(): string
}
