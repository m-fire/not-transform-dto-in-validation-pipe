import { INestApplication } from '@nestjs/common'
import { ApiTestApplication } from '@test-support/e2e'
import { TestScenario } from '@test-root/mock/test-scenario'
import { UserOutputPort } from '@src-module/user/user.output.port'
import { TestContainer } from '@test-root/mock'
import { DateTimeHolder } from '@src-support/infra/datetime'
import { UniqueIdHolder } from '@src-support/infra/unique-id'

describe('User sign-up', () => {
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

    it('Sign-up is possible through a membership registration request with valid information.', async () => {
        const scenario = new TestScenario(app)

        await scenario.signUpUser().request()
    })
})
