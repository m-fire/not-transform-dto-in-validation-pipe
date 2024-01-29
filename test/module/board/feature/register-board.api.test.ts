import { INestApplication } from '@nestjs/common'
import { TestContainer } from '@test-root/mock/test-container'
import { ApiTestApplication } from '@test-support/e2e'
import { TestScenario } from '@test-root/mock/test-scenario'
import { UniqueIdHolder } from '@src-support/infra/unique-id'
import { DateTimeHolder } from '@src-support/infra/datetime'
import { UserOutputPort } from '@src-module/user/user.output.port'
import { ImageOutputPort } from '@src-module/file/image.output.port'
import { BoardOutputPort } from '@src-module/board/board.output.port'

describe('[Certification] Bulletin board post registration', () => {
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
            .build()
    })

    it('When a validly written post is requested, post registration is possible.', async () => {
        const scenario = new TestScenario(app)
        await scenario.signUpUser().request()
        await scenario.signInUser().request()

        await scenario.registerBoard().request()
    })
})
