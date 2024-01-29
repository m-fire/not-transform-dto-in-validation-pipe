import { Column, Entity, PrimaryColumn } from 'typeorm'
import { BaseModel } from '@src-support/domain/model'
import { InitialValue, Messages } from '@src-support/domain/constant'
import { requires } from '@src-support/domain/validation'
import { StringIdEntity } from '@src-support/infra/data/typeorm'
import {
    NonReadonly,
    Objects,
    PlainObject,
} from '@src-support/infra/typescript'

@Entity({ name: 'boards' })
export class BoardEntity extends StringIdEntity {
    @PrimaryColumn({ name: 'board_number' })
    readonly boardNumber: string = InitialValue.STRING

    @Column({ name: 'title' })
    readonly title: string = InitialValue.STRING

    @Column({ name: 'content' })
    readonly content: string = InitialValue.STRING

    @Column({ name: 'write_datetime', type: 'bigint' })
    readonly writeDatetime: string = InitialValue.STRING

    @Column({ name: 'favorite_count' })
    readonly favoriteCount: number = 0

    @Column({ name: 'comment_count' })
    readonly commentCount: number = 0

    @Column({ name: 'view_count' })
    readonly viewCount: number = 0

    @Column({ name: 'writer_email' })
    readonly writerEmail: string = InitialValue.STRING

    validate() {
        const require: typeof requires = requires.bind(this)
        require(this.boardNumber?.length >= 0, () =>
            `[boardNumber] ${Messages.REQUIRE_VALUE}`)
        require(this.title?.length >= 0, () =>
            `[title] ${Messages.REQUIRE_VALUE}`)
        require(this.content?.length >= 0, () =>
            `[content] ${Messages.REQUIRE_VALUE}`)
        require(this.writeDatetime?.length > 0, () =>
            `[writeDatetime] ${Messages.REQUIRE_VALUE}`)
        require(this.favoriteCount >= 0, () =>
            `[favoriteCount] ${Messages.REQUIRE_VALUE}`)
        require(this.commentCount >= 0, () =>
            `[commentCount] ${Messages.REQUIRE_VALUE}`)
        require(this.viewCount >= 0, () =>
            `[viewCount] ${Messages.REQUIRE_VALUE}`)
        require(this.writerEmail?.length > 0, () =>
            `[writerEmail] ${Messages.REQUIRE_VALUE}`)
    }

    assignId(id: string): this {
        ;(this as NonReadonly<typeof this>).boardNumber = id
        super.assignId(id)
        return this
    }

    change(props: BoardUpdateProps): this {
        Objects.updateShallow<typeof this, typeof props>(this, props)
        return this
    }

    handleAfterLoad() {
        super.handleAfterLoad()
        this.assignId(this.boardNumber)
    }

    static create(props: BoardProps) {
        const board = new BoardEntity()
        return Objects.updateShallow(board, props)
    }
}

export type BoardProps = PlainObject<BoardEntity, keyof BaseModel<string>>

export type BoardUpdateProps = Partial<Omit<BoardProps, 'boardNumber'>>
