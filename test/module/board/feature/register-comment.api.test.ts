import { INestApplication } from '@nestjs/common'
import { TestContainer } from '@test-root/mock/test-container'
import { ApiTestApplication } from '@test-support/e2e'
import { TestScenario } from '@test-root/mock/test-scenario'
import { DateTimeHolder } from '@src-support/infra/datetime'
import { UniqueIdHolder } from '@src-support/infra/unique-id'
import { UserOutputPort } from '@src-module/user/user.output.port'
import { ImageOutputPort } from '@src-module/file/image.output.port'
import { BoardOutputPort } from '@src-module/board/board.output.port'
import { CommentOutputPort } from '@src-module/board/comment.output.port'

describe('[Verification] Register comment', () => {
    let app: INestApplication

    beforeEach(async () => {
        const tc = new TestContainer()
        app = await ApiTestApplication.builder()
            .clearDatabase({ dataCleanup: false })
            .changeProvider(DateTimeHolder.SYSTEM, tc.dateTimeHolder)
            .changeProvider(UniqueIdHolder.ULID, tc.uniqueIdHolder)
            .changeProvider(UserOutputPort, tc.userRepository)
            .changeProvider(ImageOutputPort, tc.imageRepository)
            .changeProvider(BoardOutputPort, tc.boardRepository)
            .changeProvider(CommentOutputPort, tc.commentRepository)
            .build()
    })

    it('Verified users can register valid comments on posts.', async () => {
        const scenario = new TestScenario(app)
        await scenario.signUpUser().request()
        await scenario.signInUser().request()
        await scenario.registerBoard().request()

        await scenario.registerComment().request()
    })
})
