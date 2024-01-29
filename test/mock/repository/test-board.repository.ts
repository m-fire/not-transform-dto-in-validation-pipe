import { StringIdMemoryRepository } from '@src-support/infra/data/repository'
import { BoardEntity } from '@src-module/board/domain'
import { BoardOutputPort } from '@src-module/board/board.output.port'
import { UniqueIdHolder } from '@src-support/infra/unique-id'
import { TestUserRepository } from '@test-root/mock/repository/test-user.repository'

export class TestBoardRepository
    extends StringIdMemoryRepository<BoardEntity>
    implements BoardOutputPort
{
    constructor(
        private readonly userRepository: TestUserRepository,
        private readonly uniqueIdHolder: UniqueIdHolder,
    ) {
        super(() => this.uniqueIdHolder.random())
    }

    async getByBoardNumber(boardNumber: string): Promise<BoardEntity> {
        const board = (await this.findById(boardNumber))[0]
        if (board == null) BoardOutputPort.throwBoardNotFound(boardNumber, this)
        return board
    }
}
