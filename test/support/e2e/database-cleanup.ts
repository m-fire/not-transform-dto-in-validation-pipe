import { DataSource } from 'typeorm'
import * as process from 'process'
import { INestApplication } from '@nestjs/common'
import { TableType } from 'typeorm/metadata/types/TableTypes'
import { snakeCase } from 'typeorm/util/StringUtils'

export class DatabaseCleanup {
    private readonly notTruncateTypes: TableType[] = ['view']
    private readonly ds: DataSource

    constructor(
        private readonly app: INestApplication,
        private readonly options?: DatabaseCleanupOptions,
    ) {
        this.ds = app.get(DataSource)
    }

    async clean() {
        if (process.env.NODE_ENV !== 'test')
            throw new Error('테스트 환경이 필수입니다.')

        const databaseName = this.ds.options.type.toUpperCase()
        const cleanupSql = cleanupSqlMap[databaseName]

        await this.ds.query(cleanupSql.constraintsOff)

        const entities = this.ds.entityMetadatas
        const selectedTables = this.extractSelectedTables(this.options)
        for (const { tableType: type, tableName: table } of entities) {
            if (this.notTruncateTypes.includes(type)) continue

            if (selectedTables.length == 0) {
                await this.ds.query(cleanupSql.truncate(table))
                continue
            }

            if (this.isSeletectedTable(table, selectedTables)) {
                await this.ds.query(cleanupSql.truncate(table))
            }
        }

        await this.ds.query(cleanupSql.constraintsOn)
    }

    private isSeletectedTable(currentTable: string, targetNames: string[]) {
        return targetNames.some((name) => currentTable.startsWith(name))
    }

    private extractSelectedTables(options?: DatabaseCleanupOptions) {
        return (
            options?.targetEntities?.map((e) =>
                snakeCase(e.name.split(/[eE]ntity/)[0]),
            ) ?? []
        )
    }
}

const cleanupSqlMap = {
    MYSQL: {
        constraintsOff: 'SET FOREIGN_KEY_CHECKS = 0;',
        truncate: (tableName: string) => `TRUNCATE TABLE ${tableName};`,
        constraintsOn: 'SET FOREIGN_KEY_CHECKS = 1;',
    },
    POSTGRESQL: {
        constraintsOff: 'SET xxxx',
        truncate: (tableName: string) => `TRUNCATE TABLE ${tableName};`,
        constraintsOn: 'SET xxxx',
    },
    ORACLE: {
        constraintsOff: 'SET xxxx',
        truncate: (tableName: string) => `TRUNCATE TABLE ${tableName};`,
        constraintsOn: 'SET xxxx',
    },
    MS_SQL_SERVER: {
        constraintsOff: 'SET xxxx',
        truncate: (tableName: string) => `TRUNCATE TABLE ${tableName};`,
        constraintsOn: 'SET xxxx',
    },
}

export type DatabaseCleanupOptions = {
    targetEntities?: (new (...args: any[]) => any)[]
}
