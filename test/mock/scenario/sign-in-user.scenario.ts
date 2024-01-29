import { AuthToken, SignInUserProps } from '@src-module/auth/feature'
import supertest from 'supertest'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { TestScenario } from '@test-root/mock/test-scenario'
import { UserFixture } from '@test-root/mock/fixture'
import { ApiResponse, ResponseType } from '@src-support/domain/api/response'

export class SignInUserScenario {
    constructor(private readonly app: INestApplication) {}

    async request(
        {
            updateBody,
            nextExpect,
        }: SignInUserOptions = SignInUserScenario.createRequestOptions(),
    ): Promise<TestScenario> {
        const test = supertest(this.app.getHttpServer())
            .post('/api/auth/sign-in')
            .expect(HttpStatus.OK)
        nextExpect?.(test)
        const request = updateBody(UserFixture.SignInUserRequest())

        const response = await test.send(request)

        /* After successful login, share authentication token */
        const body: ApiResponse<AuthToken> = response.body
        TestScenario.context.auth = {
            ...TestScenario.context.auth,
            ...body.data,
            token: `Bearer ${body.data.token}`,
        }

        return new TestScenario(this.app)
    }

    static createRequestOptions(): SignInUserOptions {
        return {
            updateBody: (body) => body,
            nextExpect(test: supertest.Test) {
                test.expect((res) => {
                    expect(res.body).not.toBeNull()
                    expect(res.body.result).toBe(<ResponseType>'SUCCESS')
                    expect(res.body.data.token).toBeTruthy()
                    expect(res.body.data.expirationTime).toBeGreaterThan(0)
                })
            },
        }
    }
}

export type SignInUserOptions = {
    updateBody: (body: SignInUserProps) => SignInUserProps
    nextExpect?: (test: supertest.Test) => any
}
