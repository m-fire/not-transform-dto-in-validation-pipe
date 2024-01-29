import { HttpStatus, INestApplication } from '@nestjs/common'
import { TestScenario } from '@test-root/mock'
import supertest from 'supertest'
import { BoardFixture, CommentFixture } from '@test-root/mock/fixture'
import { RegisterCommentRequest } from '@src-module/board/domain'
import { ApiResponse, ResponseType } from '@src-support/domain/api/response'
import { Messages } from '@src-support/domain/constant'

export class RegisterCommentScenario {
    constructor(private readonly app: INestApplication) {}

    async request(
        boardNumber: string = BoardFixture.PROPS.boardNumber,
        {
            updateBody,
            nextExpect,
        }: RegisterCommentOptions = RegisterCommentScenario.createRequestOptions(),
    ): Promise<TestScenario> {
        const test = supertest(this.app.getHttpServer())
            .post(`/api/boards/${boardNumber}/comments`)
            .set({ Authorization: TestScenario.context.auth.token })
            .expect(HttpStatus.CREATED)
        nextExpect?.(test)
        test.expect((response) => {
            const body: ApiResponse<string> = response.body
            expect(body.result).toBe<ResponseType>('SUCCESS')
            expect(body.data).toContain(Messages.DONE)
        })
        const request = updateBody(CommentFixture.RegisterCommentRequest())

        await test.send(request)

        return new TestScenario(this.app)
    }

    static createRequestOptions(): RegisterCommentOptions {
        return {
            updateBody: (body) => body,
        }
    }
}

export type RegisterCommentOptions = {
    updateBody: (body: RegisterCommentRequest) => RegisterCommentRequest
    nextExpect?: (test: supertest.Test) => void
}
