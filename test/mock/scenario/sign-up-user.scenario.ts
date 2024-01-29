import { SignUpUserRequest } from '@src-module/auth/feature'
import supertest from 'supertest'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { TestScenario } from '@test-root/mock/test-scenario'
import { UserFixture } from '@test-root/mock/fixture'

export class SignUpUserScenario {
    constructor(private readonly app: INestApplication) {}

    async request(
        { updateBody, nextExpect }: SignUpUserOptions = {
            updateBody: (body) => body,
        },
    ): Promise<TestScenario> {
        const test = supertest(this.app.getHttpServer())
            .post('/api/auth/sign-up')
            .expect(HttpStatus.CREATED)

        nextExpect?.(test)

        await test.send(updateBody(UserFixture.SignUpUserRequest()))

        return new TestScenario(this.app)
    }
}

export type SignUpUserOptions = {
    updateBody: (body: SignUpUserRequest) => SignUpUserRequest
    nextExpect?: (test: supertest.Test) => void
}
