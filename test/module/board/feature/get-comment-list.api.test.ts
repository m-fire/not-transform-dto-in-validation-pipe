import { TestContainer } from '@test-root/mock/test-container'
import { BoardFixture } from '@test-root/mock/fixture'
import { ApiTestApplication } from '@test-support/e2e'
import { DateTimeHolder } from '@src-support/infra/datetime'
import { UniqueIdHolder } from '@src-support/infra/unique-id'
import { HttpStatus, INestApplication } from '@nestjs/common'
import supertest from 'supertest'
import { TestScenario } from '@test-root/mock'
import { UserOutputPort } from '@src-module/user/user.output.port'
import { ImageOutputPort } from '@src-module/file/image.output.port'
import { BoardOutputPort } from '@src-module/board/board.output.port'
import { CommentOutputPort } from '@src-module/board/comment.output.port'

describe('View comment list', () => {
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

    it('Anyone can view the list of registered comments.', async () => {
        const scenario = new TestScenario(app)
        await scenario.signUpUser().request()
        await scenario.signInUser().request()
        await scenario.registerBoard().request()
        const boardNumber = BoardFixture.PROPS.boardNumber
        const test = supertest(app.getHttpServer())
            .get(`/api/boards/${boardNumber}/comments`)
            .expect(HttpStatus.OK)

        const response = await test.send()
    })
})
