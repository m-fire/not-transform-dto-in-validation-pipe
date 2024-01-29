import { InitialValue } from '@src-support/domain/constant'
import { deleteFile, hasFile } from '@src-support/infra/data/file'
import { INestApplication } from '@nestjs/common'
import {
    RegisterBoardScenario,
    SignInUserScenario,
    SignUpUserScenario,
} from '@test-root/mock/scenario'
import { RegisterCommentScenario } from '@test-root/mock/scenario/register-comment.scenario'

export class TestScenario {
    public static context = {
        auth: {
            token: InitialValue.STRING as string,
            expirationTime: InitialValue.NUMBER as number,
        },
        file: {
            uploadedFilename: null,
            uploadedFileUrl: null,
        },
    }

    constructor(private readonly app: INestApplication) {}

    signUpUser(): SignUpUserScenario {
        return new SignUpUserScenario(this.app)
    }

    signInUser(): SignInUserScenario {
        return new SignInUserScenario(this.app)
    }

    registerBoard(): RegisterBoardScenario {
        return new RegisterBoardScenario(this.app)
    }

    registerComment(): RegisterCommentScenario {
        return new RegisterCommentScenario(this.app)
    }

    static removeUploadedFile() {
        const absolutePath = TestScenario.context.file.uploadedFileUrl
        if (absolutePath == null || !hasFile(absolutePath)) {
            throw new Error('업로드 된 파일경로가 없습니다.')
        }

        deleteFile(absolutePath)
        TestScenario.context.file.uploadedFileUrl = null
    }
}
