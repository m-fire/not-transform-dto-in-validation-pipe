import { BaseMemoryRepository } from './base-memory.repository'
import { Identifiable } from '@src-support/domain/model'

export abstract class NumberIdMemoryRepository<
    MODEL extends Identifiable<number>,
> extends BaseMemoryRepository<MODEL, number> {
    private sequence: number = 0

    constructor() {
        super(() => ++this.sequence)
    }

    async reset() {
        await super.reset()
        this.sequence = 0
    }
}
