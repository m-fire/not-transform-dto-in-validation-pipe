import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { ulid } from 'ulid'
import { UniqueIdHolder } from './unique-id.holder'

@Injectable()
export class UuidV4Holder implements UniqueIdHolder {
    random(): string {
        return v4()
    }
}

@Injectable()
export class UlidHolder implements UniqueIdHolder {
    random(): string {
        return ulid(Date.now())
    }
}
