import { Injectable } from '@nestjs/common'
import { PickRepository } from '@src-support/infra/data/typeorm'
import { CommentEntity } from '@src-module/board/domain'
import { CommentOutputPort } from '@src-module/board/comment.output.port'

@Injectable()
export class CommentOutputAdapter
    extends PickRepository(CommentEntity)
    implements CommentOutputPort
{
    async save(comment: CommentEntity): Promise<CommentEntity> {
        return this.repository.save(comment)
    }

    async getCommentList(boardNumber: string): Promise<CommentEntity[]> {
        throw new Error('not implemented.')
    }
}
