import { BoardEntity, BoardProps } from '@src-module/board/domain'
import { Objects, PlainObject } from '@src-support/infra/typescript'
import { InitialValue, Messages } from '@src-support/domain/constant'
import { IsArray, IsNotEmpty } from 'class-validator'

export class RegisterBoardRequest
    implements Pick<BoardProps, 'title' | 'content'>
{
    @IsNotEmpty({ message: Messages.REQUIRE_INPUT })
    readonly title: string = InitialValue.STRING

    @IsNotEmpty({ message: Messages.REQUIRE_INPUT })
    readonly content: string = InitialValue.STRING

    @IsArray({ message: `목록을 ${Messages.REQUIRE_INPUT}` })
    readonly boardImages: string[] = []

    toModel(
        writerEmail: string,
        nowMillisUTC: () => number,
        nextId: () => string,
    ): BoardEntity {
        const writeDatetime = `${nowMillisUTC()}`
        const board = new BoardEntity()
            .assignId(nextId())
            .change({ writerEmail, writeDatetime })
        return Objects.updateShallow(board, this)
    }
}

export type RegisterBoardProps = PlainObject<RegisterBoardRequest>
