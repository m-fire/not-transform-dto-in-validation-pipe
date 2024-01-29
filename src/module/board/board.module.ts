import { forwardRef, Module } from '@nestjs/common'
import { DataAccessModule } from '@src-root/module'
import { UniqueIdModule } from '@src-support/infra/unique-id'
import { DateTimeModule } from '@src-support/infra/datetime'
import {
    GetCommentListApi,
    RegisterBoardApi,
    RegisterCommentApi,
} from '@src-module/board/feature'

@Module({
    imports: [
        forwardRef(() => DataAccessModule), // AppModule 에 이미 포함되어 forwardRef 로 순환종속성 해결
        UniqueIdModule,
        DateTimeModule,
    ],
    controllers: [
        /* BoardController */ RegisterBoardApi,
        RegisterCommentApi,
        GetCommentListApi,
    ],
    providers: [
        /* BoardService */
    ],
})
export class BoardModule {}
