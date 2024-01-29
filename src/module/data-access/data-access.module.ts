import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BoardEntity, CommentEntity } from '@src-module/board/domain'
import { UserEntity } from '@src-module/user/domain'
import { ImageEntity } from '@src-module/file/domain/image.entity'
import { BoardOutputPort } from '@src-module/board/board.output.port'
import { CommentOutputPort } from '@src-module/board/comment.output.port'
import { ImageOutputPort } from '@src-module/file/image.output.port'
import { UserOutputPort } from '@src-module/user/user.output.port'
import { BoardOutputAdapter } from './board.output.adapter'
import { CommentOutputAdapter } from '@src-module/data-access/comment.output.adapter'
import { ImageOutputAdapter } from './image.output.adapter'
import { UserOutputAdapter } from './user.output.adapter'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BoardEntity,
            CommentEntity,
            ImageEntity,
            UserEntity,
        ]),
    ],
    providers: [
        { provide: UserOutputPort, useClass: UserOutputAdapter },
        { provide: ImageOutputPort, useClass: ImageOutputAdapter },
        { provide: BoardOutputPort, useClass: BoardOutputAdapter },
        { provide: CommentOutputPort, useClass: CommentOutputAdapter },
    ],
    exports: [
        UserOutputPort,
        ImageOutputPort,
        BoardOutputPort,
        CommentOutputPort,
    ],
})
export class DataAccessModule {}
