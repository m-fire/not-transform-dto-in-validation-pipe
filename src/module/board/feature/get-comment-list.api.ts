import { CommentOutputPort } from '@src-module/board/comment.output.port'
import { BoardOutputPort } from '@src-module/board/board.output.port'
import { UserOutputPort } from '@src-module/user/user.output.port'
import {
    GetCommentListItem,
    GetCommentListResponse,
} from '@src-module/board/domain'
import { AuthorizationFailException } from '@src-support/infra/web/exception'
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'
import { GetSignedInUser } from '@src-support/infra/auth'
import { ApiResponse } from '@src-support/domain/api/response'

@Controller()
export class GetCommentListApi {
    constructor(
        private readonly commentOutput: CommentOutputPort,
        private readonly boardOutput: BoardOutputPort,
        private readonly userOutput: UserOutputPort,
    ) {}

    @Get('/api/boards/:boardNumber/comments')
    @HttpCode(HttpStatus.OK)
    async request(
        @GetSignedInUser() email: string,
        @Param('boardNumber') boardNumber: string,
    ): Promise<ApiResponse<GetCommentListResponse>> {
        // 사용자 검증
        const user = await this.userOutput.findByEmail(email)
        if (user == null) this.throwUserNotFound(email)
        // 보드 검증
        await this.boardOutput.getByBoardNumber(boardNumber)

        const comments = await this.commentOutput.getCommentList(boardNumber)
        const commentListItems = comments.map((c) =>
            GetCommentListItem.create({
                nickname: user.nickname,
                profileImage: user.profileImage,
                writeDatetime: c.writeDatetime,
                content: c.content,
            }),
        )

        return ApiResponse.successOf(
            GetCommentListResponse.of(commentListItems),
        )
    }

    private throwUserNotFound(email: string) {
        throw new AuthorizationFailException(
            GetCommentListApi,
            `email=${email}`,
        )
    }
}
