import { BoardEntity } from '@src-module/board/domain'
import { ResourceNotFoundException } from '@src-support/infra/web/exception'

export abstract class BoardOutputPort {
    abstract save(board: BoardEntity): Promise<BoardEntity>

    abstract getByBoardNumber(boardNumber: string): Promise<BoardEntity>

    static throwBoardNotFound(boardNumber: string, datasource: any = this) {
        throw new ResourceNotFoundException(
            datasource,
            `boardNumber=${boardNumber}`,
            (defaultMessage) => `작성된 게시글을 ${defaultMessage}`,
        )
    }

    static throwWriterNotFound(email: string, datasource: any = this) {
        throw new ResourceNotFoundException(
            this.constructor,
            `Board writer email=${email}`,
            (defaultMessage) => `'작성자' ${defaultMessage}`,
        )
    }
}
