import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { requires } from '@src-support/domain/validation'
import { InitialValue, Messages } from '@src-support/domain/constant/enums'
import { BaseModel } from '@src-support/domain/model'
import {
    NonReadonly,
    Objects,
    PlainObject,
} from '@src-support/infra/typescript'
import { NumberIdEntity } from '@src-support/infra/data/typeorm'

@Entity({ name: 'images' })
export class ImageEntity extends NumberIdEntity {
    @PrimaryGeneratedColumn('increment', { name: 'sequence' })
    readonly sequence: number /* The automatic increment value can only be applied if the field value is empty. */

    @Column({ name: 'url' })
    readonly url: string = InitialValue.STRING

    @Column({ name: 'owner_id' })
    readonly ownerId: string = InitialValue.STRING

    @BeforeInsert()
    @BeforeUpdate()
    validate() {
        const require: typeof requires = requires.bind(this)
        require(this.url?.length > 0, () => `[url] ${Messages.REQUIRE_VALUE}`)
        require(this.ownerId?.length > 0, () =>
            `[ownerId] ${Messages.REQUIRE_VALUE}`)
    }

    assignId(id: number): this {
        /* After automatic ID is set by TypeORM, manual calls are restricted to protect the ID. */
        if (this.sequence !== undefined) return
        ;(this as NonReadonly<typeof this>).sequence = id
        super.assignId(id)
        return this
    }

    handleAfterLoad() {
        super.handleAfterLoad()
        this.assignId(this.sequence)
    }

    static create(props: ImageProps): ImageEntity {
        return Objects.updateShallow(new ImageEntity(), props)
    }
}

export type ImageProps = PlainObject<
    ImageEntity,
    keyof BaseModel<number> | 'sequence'
>
