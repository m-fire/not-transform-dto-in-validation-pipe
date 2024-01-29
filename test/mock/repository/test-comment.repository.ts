import { NumberIdMemoryRepository } from '@src-support/infra/data/repository'
import { CommentEntity } from '@src-module/board/domain'
import { CommentOutputPort } from '@src-module/board/comment.output.port'

export class TestCommentRepository
    extends NumberIdMemoryRepository<CommentEntity>
    implements CommentOutputPort
{
    async getCommentList(boardNumber: string): Promise<CommentEntity[]> {
        return Array.from(this.persistence.values()).filter(
            (comment) => comment.boardNumber === boardNumber,
        )
    }
}
