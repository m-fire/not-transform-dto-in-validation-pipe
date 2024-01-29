import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Inject,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common'
import { BoardOutputPort } from '@src-module/board/board.output.port'
import { CommentOutputPort } from '@src-module/board/comment.output.port'
import { DateTimeHolder } from '@src-support/infra/datetime'
import { Messages } from '@src-support/domain/constant'
import { RegisterCommentRequest } from '@src-module/board/domain/register-comment.request'
import { JwtAuthGuard } from '@src-module/auth/jwt-auth.guard'
import { GetSignedInUser } from '@src-support/infra/auth'
import { CommentEntity } from '@src-module/board/domain'
import { ApiResponse } from '@src-support/domain/api/response'
import { transaction } from '@src-support/infra/data/typeorm'
import { DataSource } from 'typeorm'

@Controller()
export class RegisterCommentApi {
    constructor(
        @Inject(DateTimeHolder.SYSTEM)
        private readonly dateTimeHolder: DateTimeHolder,
        private readonly boardOutput: BoardOutputPort,
        private readonly commentOutput: CommentOutputPort,
        private readonly dataSource: DataSource,
    ) {}

    @Post('/api/boards/:boardNumber/comments')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async request(
        @GetSignedInUser() email: string,
        @Param('boardNumber') boardNumber: string,
        @Body() request: RegisterCommentRequest,
    ): Promise<void | ApiResponse<string>> {
        if (email == null)
            RegisterCommentRequest.throwAuthorizationFail(email, this)

        await this.registerComment(email, boardNumber, request)

        return ApiResponse.successOf(`댓글이 생성 ${Messages.DONE}`)
    }

    async registerComment(
        email: string,
        boardNumber: string,
        request: RegisterCommentRequest,
    ) {
        await transaction(this.dataSource, async () => {
            //1. 보드존재 유무, 댓글요청 검증
            const board = await this.boardOutput.getByBoardNumber(boardNumber)
            const isNotWriter = email !== board.writerEmail
            if (isNotWriter)
                RegisterCommentRequest.throwNoCommentPermission(email, this)

            //2. 요청 데이터로 댓글 생성/저장
            const comment: CommentEntity = request.toModel({
                boardNumber,
                writerEmail: email,
                writeDatetime: `${this.dateTimeHolder.milliSeconds()}`,
            })
            await this.commentOutput.save(comment)

            //3. 댓글이 저장된 경우, 댓글 수 +1 증가
            const commentCount = board.commentCount + 1
            await this.boardOutput.save(board.change({ commentCount }))
        }) // end transaction
    }
}
