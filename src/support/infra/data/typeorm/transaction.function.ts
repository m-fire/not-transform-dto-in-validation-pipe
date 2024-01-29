import { DataSource, QueryRunner } from 'typeorm'

export async function transaction<R>(
    dataSource: DataSource,
    execute: () => Promise<R>,
): Promise<R | void> {
    const q: QueryRunner = dataSource.createQueryRunner()
    try {
        await q.startTransaction()

        const result = await execute()

        await q.commitTransaction()
        return result
    } catch (e) {
        await q.rollbackTransaction()
        throw e
    } finally {
        await q.release()
    }
}
