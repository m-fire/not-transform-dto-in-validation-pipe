import { Identifiable } from '@src-support/domain/model/identifiable'

export abstract class BaseModel<ID extends number | string>
    implements Identifiable<ID>
{
    readonly #initialIdValue: ID

    #id: ID

    protected constructor(initialIdValue: ID) {
        this.#initialIdValue = initialIdValue
        this.#id = initialIdValue
    }

    get id(): ID {
        return this.#id
    }

    get isNew(): boolean {
        return this.#id === this.#initialIdValue
    }

    assignId(id: ID): this {
        this.#id = id
        return this
    }
}
