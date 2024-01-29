import { BoardOutputPort } from '@src-module/board/board.output.port'
import { UniqueIdHolder } from '@src-support/infra/unique-id'
import { RegisterBoardRequest } from '@src-module/board/domain'
import { UserOutputPort } from '@src-module/user/user.output.port'
import { ImageOutputPort } from '@src-module/file/image.output.port'
import { ImageEntity } from '@src-module/file/domain'
import { DateTimeHolder } from '@src-support/infra/datetime'
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Inject,
    Post,
    UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '@src-module/auth/jwt-auth.guard'
import { GetSignedInUser } from '@src-support/infra/auth'
import { ApiResponse } from '@src-support/domain/api/response'
import { Messages } from '@src-support/domain/constant'

@Controller()
export class RegisterBoardApi {
    constructor(
        @Inject(UniqueIdHolder.ULID)
        private readonly uniqueIdHolder: UniqueIdHolder,
        @Inject(DateTimeHolder.SYSTEM)
        private readonly dateTimeHolder: DateTimeHolder,
        private readonly userOutput: UserOutputPort,
        private readonly imageOutput: ImageOutputPort,
        private readonly boardOutput: BoardOutputPort,
    ) {}

    @Post('/api/boards')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async request(
        @GetSignedInUser() email: string,
        @Body() request: RegisterBoardRequest,
    ): Promise<ApiResponse<string>> {
        const hasWriter = await this.userOutput.existByEmail(email)
        if (hasWriter == false) BoardOutputPort.throwWriterNotFound(email)

        const board = await this.boardOutput.save(
            request.toModel(
                email,
                () => this.dateTimeHolder.milliSeconds(),
                () => this.uniqueIdHolder.random(),
            ),
        )

        const uploadedImages = request.boardImages.map((imageUrl) =>
            ImageEntity.create({
                url: imageUrl,
                ownerId: board.boardNumber,
            }),
        )
        await this.imageOutput.saveAll(...uploadedImages)

        return ApiResponse.successOf(`게시물이 등록 ${Messages.DONE}`)
    }
}
