import { UserEntity } from '@src-module/user/domain'

export abstract class UserOutputPort {
    abstract save(user: UserEntity): Promise<UserEntity>

    abstract existByEmail(email: string): Promise<boolean>

    abstract findByEmail(email: string): Promise<UserEntity | null>
}
