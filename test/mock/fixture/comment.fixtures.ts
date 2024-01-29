import {
    CommentEntity,
    CommentProps,
    RegisterCommentRequest,
} from '@src-module/board/domain'
import { InitialValue } from '@src-support/domain/constant'
import { BoardFixture, UserFixture } from '@test-root/mock/fixture/index'
import { NonReadonly, Objects } from '@src-support/infra/typescript'

export class CommentFixture {
    static readonly PROPS: CommentProps = {
        commentNumber: InitialValue.NUMBER,
        content: '댓글 내용',
        writeDatetime: `${InitialValue.MILLISECONDS}`,
        writerEmail: UserFixture.PROPS.email,
        boardNumber: BoardFixture.PROPS.boardNumber,
    } as const

    static RegisterCommentRequest() {
        const request = new RegisterCommentRequest()
        ;(request as NonReadonly<typeof request>).content = this.PROPS.content
        return request
    }

    static create(props: Partial<CommentProps> = this.PROPS): CommentEntity {
        const comment = Objects.updateShallow(new CommentEntity(), {
            ...this.PROPS,
            props,
        })
        comment.validate()
        return comment
    }
}
