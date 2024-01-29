import { HttpStatus, INestApplication } from '@nestjs/common'
import { TestScenario } from '@test-root/mock/test-scenario'
import supertest from 'supertest'
import { BoardFixture } from '@test-root/mock/fixture'
import { RegisterBoardRequest } from '@src-module/board/domain'

export class RegisterBoardScenario {
    constructor(private readonly app: INestApplication) {}

    async request(
        {
            updateBody,
            nextExpect,
        }: RegisterBoardOptions = RegisterBoardScenario.createRequestOptions(),
    ): Promise<TestScenario> {
        const test = supertest(this.app.getHttpServer())
            .post('/api/boards')
            .set({ Authorization: TestScenario.context.auth.token })
            .expect(HttpStatus.CREATED)

        nextExpect?.(test)

        await test.send(updateBody(BoardFixture.RegisterBoardRequest()))

        return new TestScenario(this.app)
    }

    static createRequestOptions(): RegisterBoardOptions {
        return {
            updateBody: (body) => body,
        }
    }
}

export type RegisterBoardOptions = {
    updateBody: (body: RegisterBoardRequest) => RegisterBoardRequest
    nextExpect?: (test: supertest.Test) => void
}
