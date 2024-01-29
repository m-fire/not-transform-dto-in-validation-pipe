import { DataType, newDb } from 'pg-mem'
import { ulid } from 'ulid'
import { DataSource } from 'typeorm'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

// ref: https://github.com/oguimbal/pg-mem
export async function createPgMemDataSource() {
    const db = newDb({
        autoCreateForeignKeyIndices: true,
    })
    db.public.registerFunction({
        name: 'current_database',
        implementation: () => 'test',
    })

    db.public.registerFunction({
        name: 'version',
        implementation: () => 'test',
    })

    db.registerExtension('uuid-ossp', (schema) => {
        schema.registerFunction({
            name: 'uuid_generate_v4',
            returns: DataType.uuid,
            implementation: () => ulid(),
            impure: true,
        })
    })

    db.public.interceptQueries((sql) => {
        const newSql = sql.replace(
            /\bnumeric\s*\(\s*\d+\s*,\s*\d+\s*\)/g,
            'float',
        )
        if (sql !== newSql) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return db.public.many(newSql)
        }

        return null
    })

    db.public.interceptQueries((queryText) => {
        if (
            queryText.search(/(pg_views|pg_matviews|pg_tables|pg_enum)/g) > -1
        ) {
            return []
        }
        return null
    })

    const options: TypeOrmModuleOptions = {
        type: 'postgres',
        migrationsRun: false,
        host: 'localhost',
        port: 5432,
        username: 'test',
        password: 'test',
        database: 'test',
        entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
        autoLoadEntities: true,
        logging: true,
        // synchronize: true,
        // dropSchema: true,
    }
    const dataSource: DataSource =
        await db.adapters.createTypeormDataSource(options)

    await dataSource.initialize()

    return dataSource
}
