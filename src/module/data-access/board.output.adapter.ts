import { Injectable } from '@nestjs/common'
import { PickRepository } from '@src-support/infra/data/typeorm'
import { BoardEntity } from '@src-module/board/domain'
import { BoardOutputPort } from '@src-module/board/board.output.port'
import { ResourceNotFoundException } from '@src-support/infra/web/exception'
import { RuntimeException } from '@nestjs/core/errors/exceptions'

@Injectable()
export class BoardOutputAdapter
    extends PickRepository(BoardEntity)
    implements BoardOutputPort
{
    async save(board: BoardEntity): Promise<BoardEntity> {
        return this.repository.save(board)
    }

    async getByBoardNumber(boardNumber: string): Promise<BoardEntity> {
        const board = await this.repository.findOne({
            where: { boardNumber },
        })
        if (board == null) BoardOutputPort.throwBoardNotFound(boardNumber, this)
        return board
    }

    static throwBoardNotFound(error: RuntimeException) {
        throw new ResourceNotFoundException(
            this,
            error.message,
            (msg) => `게시글을 ${msg}`,
        )
    }
}
