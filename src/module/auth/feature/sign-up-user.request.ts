import {
    Equals,
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator'
import { UserEntity, UserProps } from '@src-module/user/domain'
import { InitialValue, Messages } from '@src-support/domain/constant/enums'
import { Objects, PlainObject } from '@src-support/infra/typescript'
import { ResourceDuplicatedException } from '@src-support/infra/web/exception'

export class SignUpUserRequest
    implements Omit<UserProps, 'addressDetail' | 'profileImage'>
{
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

    @IsNotEmpty({ message: Messages.REQUIRE_INPUT })
    readonly nickname: string = InitialValue.STRING

    @Matches(/^[0-9]{3}[0-9]{4}[0-9]{4}$/, {
        message: `숫자만 ${Messages.REQUIRE_INPUT}`,
    })
    @IsNotEmpty({ message: Messages.REQUIRE_INPUT })
    readonly telNumber: string = InitialValue.STRING

    @IsNotEmpty({ message: Messages.REQUIRE_INPUT })
    readonly address: string = InitialValue.STRING

    @IsOptional()
    readonly addressDetail?: string = InitialValue.STRING

    @IsBoolean({ message: Messages.REQUIRE_SELECT })
    @Equals(true, { message: `약관동의는 ${Messages.REQUIRE_VALUE}` })
    readonly agreedPersonal: boolean = false

    getValidatingFields() {
        const { email, password, nickname, telNumber } = this
        return Object.entries({ email, password, nickname, telNumber })
    }

    async toModel(): Promise<UserEntity> {
        const password = await this.encrypt(this.password)
        return Objects.updateShallow(new UserEntity(), { ...this, password })
    }

    private async encrypt(password: string) {
        return password
    }

    static throwDuplicated(name: string, value: string) {
        throw new ResourceDuplicatedException(
            SignUpUserRequest,
            `${name}:'${value}'`,
            (defaultMessage) => `'${name}' ${defaultMessage}`,
        )
    }
}

export type SignUpUserProps = PlainObject<SignUpUserRequest>
