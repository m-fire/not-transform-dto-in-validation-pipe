import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiResponse } from '@src-support/domain/api/response'
import { UserOutputPort } from '@src-module/user/user.output.port'
import { Messages } from '@src-support/domain/constant/enums'
import { SignUpUserRequest } from './sign-up-user.request'

@Controller()
export class SignUpUserApi {
    constructor(private readonly userOutput: UserOutputPort) {}

    @Post('/api/auth/sign-up')
    @HttpCode(HttpStatus.CREATED)
    async request(
        @Body() request: SignUpUserRequest,
    ): Promise<ApiResponse<string>> {
        await this.sighUp(request)
        return ApiResponse.successOf(`정상 등록 ${Messages.DONE}`)
    }

    async sighUp(request: SignUpUserRequest): Promise<void> {
        const fields = request.getValidatingFields()
        await this.validateFields(fields)

        await this.userOutput.save(await request.toModel())
    }

    private async validateFields(fields: [string, string][]) {
        for (const [name, value] of fields) {
            const existsValue = await this.userOutput.existByEmail(name)
            if (existsValue) SignUpUserRequest.throwDuplicated(name, value)
        }
    }
}
