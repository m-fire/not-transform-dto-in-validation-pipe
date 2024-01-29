import { InitialValue } from '@src-support/domain/constant'
import { BaseModel } from '@src-support/domain/model/base.model'

export abstract class NumberIdModel extends BaseModel<number> {
    protected constructor() {
        super(InitialValue.NUMBER)
    }
}

export abstract class StringIdModel extends BaseModel<string> {
    protected constructor() {
        super(InitialValue.STRING)
    }
}
