import { compare } from 'bcrypt'
import { SignInFailException } from '@src-support/infra/web/exception'
import { InitialValue, Messages } from '@src-support/domain/constant'
import { PlainObject } from '@src-support/infra/typescript'
import {
    IsEmail,
    IsNotEmpty,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator'

export class SignInUserRequest {
    /* FIXME: PickType() can't be used: TypeError: "Cannot read properties of undefined (reading 'name')" */
    //extends PickType(SignUpUserRequest, ['email', 'password'] as const) {

    @IsEmail(
        {},
        {
            message: `이메일을 ${Messages.REQUIRE_INPUT}`,
        },
    )
    @IsNotEmpty({ message: Messages.REQUIRE_INPUT })
    readonly email: string = InitialValue.STRING

    @Matches(/(?=.*\d)(?=.*[a-z]).{8,}/, {
        message: `비밀번호는 영문 대소문자,숫자 조합으로 ${Messages.REQUIRE_INPUT}`,
    })
    @MinLength(8, { message: '최소 8자 이상' })
    @MaxLength(20, { message: '최대 20자 이하' })
    @IsNotEmpty({ message: Messages.REQUIRE_INPUT })
    readonly password: string = InitialValue.STRING

    async passwordEquals(origin: string): Promise<boolean> {
        return await compare(this.password, origin)
    }

    static throwSignInFail(reason: string) {
        throw new SignInFailException(
            SignInUserRequest,
            reason,
            (responseMessage) =>
                `${responseMessage} 입력한 정보를 다시 확인해 주세요.`,
        )
    }
}

export type SignInUserProps = PlainObject<SignInUserRequest>
