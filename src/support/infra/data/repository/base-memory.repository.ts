import { Identifiable } from '@src-support/domain/model'
import { MemoryRepository } from './memory-repository'
import { Objects } from '@src-support/infra/typescript'
import { Constructor } from '@nestjs/common/utils/merge-with-values.util'

export abstract class BaseMemoryRepository<
    MODEL extends Identifiable<ID>,
    ID extends number | string,
> implements MemoryRepository<MODEL, ID>
{
    protected constructor(
        protected readonly nextId: () => ID,
        protected readonly persistence: Map<ID, MODEL> = new Map(),
    ) {}

    async count(): Promise<number> {
        return this.persistence.size
    }

    async exist(model: MODEL): Promise<boolean> {
        return this.existById(model.id)
    }

    async existById(id: ID): Promise<boolean> {
        return this.persistence.has(id)
    }

    async findById(...ids: ID[]): Promise<MODEL[]> {
        const models: MODEL[] = []
        for (const id of ids) {
            const model = this.persistence.get(id)
            if (model == null) continue
            models.push(this.updateTo(this.new(model), model))
        }
        return models
    }

    async findAll(): Promise<MODEL[]> {
        const results: MODEL[] = []
        for (const [, model] of this.persistence) {
            results.push(this.updateTo(this.new(model), model))
        }
        return results
    }

    async save(model: MODEL): Promise<MODEL> {
        let result: MODEL

        if (model.isNew) {
            const newed: MODEL = this.updateTo(this.new(model), model)
            newed.assignId(this.nextId())

            this.persistence.set(newed.id, newed)

            result = newed
        } else {
            const saved: MODEL = this.persistence.get(model.id)
            if (saved == null) this.throwIllegalSavedState(model)
            const updated = this.updateTo(saved, model)

            this.persistence.set(saved.id, updated)

            result = updated
        }

        return this.updateTo(this.new(model), result)
    }

    private new(model: MODEL): MODEL {
        return new (model.constructor as Constructor<MODEL>)()
    }

    private updateTo(target: MODEL, source: MODEL) {
        const updated = Objects.updateShallow(target, source)
        updated.assignId(source.id)
        return updated
    }

    async saveAll(...models: MODEL[]): Promise<MODEL[]> {
        const results = []
        for (const model of models) {
            results.push(await this.save(model))
        }
        return results
    }

    private throwIllegalSavedState(model: MODEL) {
        throw new Error(`fail to save. model=${model}`)
    }

    async delete(...models: MODEL[]): Promise<void> {
        models.forEach((m) => this.deleteById(m.id))
    }

    async deleteById(...ids: ID[]): Promise<void> {
        ids.forEach((id) => this.persistence.delete(id))
    }

    async deleteAll(): Promise<void> {
        this.persistence.clear()
    }

    async reset(): Promise<void> {
        await this.deleteAll()
    }
}
