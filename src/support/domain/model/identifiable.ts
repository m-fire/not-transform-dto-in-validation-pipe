export interface Identifiable<ID extends number | string> {
    get id(): ID

    get isNew(): boolean

    assignId(id: ID): this
}
