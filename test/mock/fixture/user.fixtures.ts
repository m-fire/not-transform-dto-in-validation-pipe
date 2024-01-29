import { UserEntity, UserProps } from '@src-module/user/domain'
import { Objects } from '@src-support/infra/typescript'
import { ApiResponse } from '@src-support/domain/api/response'
import { SignInUserRequest, SignUpUserRequest } from '@src-module/auth/feature'

export abstract class UserFixture {
    static readonly PROPS: UserProps = {
        email: 'test@email.com',
        password: 'P3ssw0rd!',
        nickname: '닉네임',
        telNumber: '00012345678',
        address: '주소',
        addressDetail: '주소상세 또는 null',
        profileImage: null,
        agreedPersonal: true,
    } as const

    static create(props: UserProps = this.PROPS): UserEntity {
        const user = Objects.updateShallow(new UserEntity(), {
            ...this.PROPS,
            ...props,
        })
        user.validate()
        return user
    }

    static SignUpUserRequest(): SignUpUserRequest {
        return Objects.updateShallow(new SignUpUserRequest(), this.create())
    }

    static SignInUserRequest() {
        return Objects.updateShallow(
            new SignInUserRequest(),
            UserFixture.create(),
        )
    }
}
