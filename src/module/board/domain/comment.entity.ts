import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { NumberIdEntity } from '@src-support/infra/data/typeorm'
import { InitialValue, Messages } from '@src-support/domain/constant'
import { BaseModel } from '@src-support/domain/model'
import { requires } from '@src-support/domain/validation'
import {
    NonReadonly,
    Objects,
    PlainObject,
} from '@src-support/infra/typescript'

@Entity({ name: 'comments' })
export class CommentEntity extends NumberIdEntity {
    @PrimaryGeneratedColumn({ name: 'comment_number' })
    readonly commentNumber: number

    @Column({ name: 'content' })
    readonly content: string = InitialValue.STRING

    @Column({ name: 'write_datetime' })
    readonly writeDatetime: string = InitialValue.STRING

    @Column({ name: 'writer_email' })
    readonly writerEmail: string = InitialValue.STRING

    @Column({ name: 'board_number' })
    readonly boardNumber: string = InitialValue.STRING

    validate() {
        const require: typeof requires = requires.bind(this)
        require(this.content?.length >= 0, () =>
            `[content] ${Messages.REQUIRE_VALUE}`)
        require(this.writeDatetime?.length > 0, () =>
            `[writeDatetime] ${Messages.REQUIRE_VALUE}`)
        require(this.writerEmail?.length > 0, () =>
            `[writerEmail] ${Messages.REQUIRE_VALUE}`)
        require(this.boardNumber?.length >= 0, () =>
            `[boardNumber] ${Messages.REQUIRE_VALUE}`)
    }

    assignId(id: number): this {
        /* After automatic ID is set by TypeORM, manual calls are restricted to protect the ID. */
        if (this.commentNumber !== undefined) return
        ;(this as NonReadonly<typeof this>).commentNumber = id
        super.assignId(id)
        return this
    }

    change(props: UpdateCommentProps) {
        Objects.updateShallow<typeof this, typeof props>(this, props)
    }

    handleAfterLoad() {
        super.handleAfterLoad()
        this.assignId(this.commentNumber)
    }
}

export type CommentProps = PlainObject<CommentEntity, keyof BaseModel<string>>

export type UpdateCommentProps = Partial<Omit<CommentProps, 'commentNumber'>>
