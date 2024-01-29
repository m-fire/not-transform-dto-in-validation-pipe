import { Injectable } from '@nestjs/common'
import { PickRepository } from '@src-support/infra/data/typeorm'
import { UserEntity } from '@src-module/user/domain'
import { UserOutputPort } from '@src-module/user/user.output.port'

@Injectable()
export class UserOutputAdapter
    extends PickRepository(UserEntity)
    implements UserOutputPort
{
    async save(user: UserEntity): Promise<UserEntity> {
        return this.repository.save(user)
    }

    async existByEmail(email: string): Promise<boolean> {
        return this.repository.exist({ where: { email } })
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.repository.findOne({ where: { email } })
    }
}
