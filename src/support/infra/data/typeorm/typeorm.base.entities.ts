import { TypeormBaseEntity } from './typeorm.base.entity'
import { InitialValue } from '@src-support/domain/constant'

export abstract class StringIdEntity extends TypeormBaseEntity<string> {
    constructor() {
        super(InitialValue.STRING)
    }
}

export abstract class NumberIdEntity extends TypeormBaseEntity<number> {
    constructor() {
        super(InitialValue.NUMBER)
    }
}
