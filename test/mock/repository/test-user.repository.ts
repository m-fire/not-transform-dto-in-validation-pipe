import { StringIdMemoryRepository } from '@src-support/infra/data/repository'
import { UserOutputPort } from '@src-module/user/user.output.port'
import { UserEntity } from '@src-module/user/domain'
import { UserFixture } from '@test-root/mock/fixture'

export class TestUserRepository
    extends StringIdMemoryRepository<UserEntity>
    implements UserOutputPort
{
    private static sequence: number = 0

    constructor() {
        super(() => UserFixture.PROPS.email)
    }

    async reset(): Promise<void> {
        await super.reset()
        TestUserRepository.sequence = 0
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return (await this.findById(email))[0]
    }

    async existByEmail(email: string): Promise<boolean> {
        for (const e of this.persistence.values()) {
            if (e.email === email) return true
        }
        return false
    }
}
