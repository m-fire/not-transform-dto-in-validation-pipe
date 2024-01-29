import { DataSource, ObjectLiteral, Repository } from 'typeorm'
import { Constructor } from '@src-support/infra/typescript/global-types'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeormBaseRepository } from '@src-support/infra/data/typeorm/typeorm.base.repository'

/**
 * TypeOrmRepository Factory for Defining extend class.
 *
 * ref: https://stackoverflow.com/questions/75984238/nestjs-typeorm-generic-inheritance-of-repository-not-working-this-function-is-n
 */
export function PickRepository<ENTITY extends ObjectLiteral>(
    entityClassRef: Constructor<ENTITY>,
): Constructor<TypeormBaseRepository<ENTITY>> {
    class BaseRepositoryClass extends TypeormBaseRepository<ENTITY> {
        constructor(
            @InjectRepository(entityClassRef) repository: Repository<ENTITY>,
            dataSource: DataSource,
        ) {
            super(repository, dataSource)
        }
    }

    return BaseRepositoryClass
}
