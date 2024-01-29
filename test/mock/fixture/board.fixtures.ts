import {
    BoardEntity,
    BoardProps,
    RegisterBoardRequest,
} from '@src-module/board/domain'
import { Objects } from '@src-support/infra/typescript'
import { InitialValue } from '@src-support/domain/constant'
import { UserFixture } from '@test-root/mock/fixture/user.fixtures'
import { ImageFixture } from '@test-root/mock/fixture/image.fixtures'
import { TestFileConfig } from '@test-support/file-system'

export abstract class BoardFixture {
    static readonly PROPS: BoardProps = {
        boardNumber: InitialValue.ULID_STRING,
        title: '게시물-제목',
        content: '게시물-내용',
        writeDatetime: `${InitialValue.MILLISECONDS}`,
        favoriteCount: 0,
        commentCount: 0,
        viewCount: 0,
        writerEmail: UserFixture.PROPS.email,
    } as const

    static create(props: Partial<BoardProps> = this.PROPS): BoardEntity {
        const board = Objects.updateShallow(new BoardEntity(), {
            ...this.PROPS,
            props,
        })
        board.validate()
        return board
    }

    static RegisterBoardRequest(): RegisterBoardRequest {
        const request = Objects.updateShallow(
            new RegisterBoardRequest(),
            this.create(),
        )
        request.boardImages.push(ImageFixture.PROPS.url)
        return request
    }
}
