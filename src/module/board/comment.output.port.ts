import { CommentEntity } from '@src-module/board/domain'

export abstract class CommentOutputPort {
    abstract save(comment: CommentEntity): Promise<CommentEntity>

    abstract getCommentList(boardNumber: string): Promise<CommentEntity[]>
}
