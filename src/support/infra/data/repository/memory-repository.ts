import { Identifiable } from '@src-support/domain/model'

export interface MemoryRepository<
    MODEL extends Identifiable<ID>,
    ID extends number | string,
> {
    count(): Promise<number>

    exist(model: MODEL): Promise<boolean>

    findById(...ids: ID[]): Promise<MODEL[]>

    findAll(): Promise<MODEL[]>

    existById(id: ID): Promise<boolean>

    save(model: MODEL): Promise<MODEL>

    saveAll(...models: MODEL[]): Promise<MODEL[]>

    delete(model: MODEL): Promise<void>

    deleteById(...ids: ID[]): Promise<void>

    deleteAll(): Promise<void>

    /** 시퀀스, 저장소 등 초기화 */
    reset(): Promise<void>
}
