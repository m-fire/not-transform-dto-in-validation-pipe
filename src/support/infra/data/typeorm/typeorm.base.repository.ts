import {
    DataSource,
    ObjectLiteral,
    QueryBuilder,
    Repository,
    SelectQueryBuilder,
} from 'typeorm'

export abstract class TypeormBaseRepository<ENTITY extends ObjectLiteral> {
    protected constructor(
        protected readonly repository: Repository<ENTITY>,
        protected readonly dataSource: DataSource,
    ) {}

    // `TypeORM Repository.createQueryBuilder()`와 동일한 작업을 수행합니다.
    protected queryBuilder(
        ...args: Parameters<typeof this.repository.createQueryBuilder>
    ) {
        return this.repository.createQueryBuilder(...args)
    }

    // ## `TypeORM SelectQueryBuilder.select()`와 동일한 작업을 수행합니다.
    // ```
    // reason of use bind(): 함수 할당문이 아닌 일반 메서드 선언시, 쿼리빌더.select 의
    // 모든 오버로딩 메서드 인자타입(`SelectQueryBuilder<ENTITY>['select']`) 추론이 잘 되지 않았습니다.
    // 선언형태의 원인은 메서드 호출 시 마다 `queryBuilder`가 생성되어야 하는 조건과, `select` 함수 내부
    // `this`가 SelectQueryBuilder 인스턴스를 참조해야 하는 두가지 조건들을 만족하기위해 아래의 형태로 구현되었습니다.
    // ```
    protected select: SelectQueryBuilder<ENTITY>['select'] = ((
        ...args: Parameters<SelectQueryBuilder<ENTITY>['select']>
    ) => this.queryBuilder().select(...args)).bind(this.queryBuilder())

    // `TypeORM QueryBuilder.insert()`와 동일한 작업을 수행합니다.
    protected insert(...args: Parameters<QueryBuilder<ENTITY>['insert']>) {
        return this.queryBuilder().insert(...args)
    }

    // `TypeORM QueryBuilder.update()`와 동일한 작업을 수행합니다.
    protected update(...args: Parameters<QueryBuilder<ENTITY>['update']>) {
        return this.queryBuilder().update(...args)
    }

    // `TypeORM QueryBuilder.delete()`와 동일한 작업을 수행합니다.
    protected delete(...args: Parameters<QueryBuilder<ENTITY>['delete']>) {
        return this.queryBuilder().delete(...args)
    }

    // `TypeORM QueryBuilder.softDelete()`와 동일한 작업을 수행합니다.
    protected softDelete(
        ...args: Parameters<QueryBuilder<ENTITY>['softDelete']>
    ) {
        return this.queryBuilder().softDelete(...args)
    }

    // `TypeORM Repository.query()`와 동일한 작업을 수행합니다.
    protected query: Repository<ENTITY>['query'] = this.repository.query.bind(
        this.repository,
    )

    // `UNION`키워드가 다수의 SELECT 쿼리문 사이에 배치되어 결합된 SQL을 생성합니다.
    protected union(...selectQueries: string[]): string {
        return `(${selectQueries.join(') UNION (')})`
    }
}
