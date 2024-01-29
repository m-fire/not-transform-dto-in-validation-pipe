import { BaseModel } from '@src-support/domain/model'
import { AfterLoad, BeforeInsert, BeforeUpdate } from 'typeorm'

export abstract class TypeormBaseEntity<
    ID extends number | string,
> extends BaseModel<ID> {
    protected constructor(initialIdValue: ID) {
        super(initialIdValue)
    }

    @BeforeInsert()
    @BeforeUpdate()
    handleBeforeSave() {
        this.validate()
    }

    @AfterLoad()
    handleAfterLoad() {}

    abstract validate(): void
}
