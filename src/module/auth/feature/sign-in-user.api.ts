import { UserOutputPort } from '@src-module/user/user.output.port'
import { JwtService } from '@nestjs/jwt'
import { AuthToken, SignInUserRequest } from '@src-module/auth/feature'
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiResponse } from '@src-support/domain/api/response'

@Controller()
export class SignInUserApi {
    constructor(
        private readonly userOutput: UserOutputPort,
        private readonly jwtService: JwtService,
    ) {}

    @Post('/api/auth/sign-in')
    @HttpCode(HttpStatus.OK)
    async request(
        @Body() request: SignInUserRequest,
    ): Promise<ApiResponse<AuthToken>> {
        const response = await this.signIn(request)
        return ApiResponse.successOf(response)
    }

    async signIn(request: SignInUserRequest) {
        const user = await this.userOutput.findByEmail(request.email)
        if (user == null)
            SignInUserRequest.throwSignInFail('Email does not exist.')

        if ((await request.passwordEquals(user.password)) == false)
            SignInUserRequest.throwSignInFail('The password is incorrect.')

        const token = this.jwtService.sign({ subject: request.email })
        const expirationTime = 3600

        return AuthToken.of(token, expirationTime)
    }
}
