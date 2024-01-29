import { INestApplication } from '@nestjs/common'
import { ApiTestApplication } from '@test-support/e2e'
import { TestScenario } from '@test-root/mock/test-scenario'
import { DateTimeHolder } from '@src-support/infra/datetime'
import { UniqueIdHolder } from '@src-support/infra/unique-id'
import { TestContainer } from '@test-root/mock'
import { UserOutputPort } from '@src-module/user/user.output.port'

describe('User sign-in', () => {
    let app: INestApplication

    beforeEach(async () => {
        const tc = new TestContainer()
        app = await ApiTestApplication.builder()
            .clearDatabase({ dataCleanup: false })
            .changeProvider(DateTimeHolder.SYSTEM, tc.dateTimeHolder)
            .changeProvider(UniqueIdHolder.ULID, tc.uniqueIdHolder)
            .changeProvider(UserOutputPort, tc.userRepository)
            .build()
    })

    it('User can sign-in by requesting valid information.', async () => {
        const scenario = new TestScenario(app)
        await scenario.signUpUser().request()

        await scenario.signInUser().request()
    })
})
