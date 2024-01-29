import { BaseMemoryRepository } from './base-memory.repository'
import { Identifiable } from '@src-support/domain/model'

export abstract class StringIdMemoryRepository<
    MODEL extends Identifiable<string>,
> extends BaseMemoryRepository<MODEL, string> {
    protected constructor(nextId: () => string) {
        super(nextId)
    }

    async reset() {
        await super.reset()
    }
}
