import { ConsoleLogger, INestApplication, ModuleMetadata } from '@nestjs/common'
import { AppModule } from '@src-root/app.module'
import { Test, TestingModuleBuilder } from '@nestjs/testing'
import { configureNestApplication } from '@src-root/config'
import { DatabaseCleanup, DatabaseCleanupOptions } from './database-cleanup'
import { Objects } from '@src-support/infra/typescript'
import { ModuleDefinition } from '@nestjs/core/interfaces/module-definition.interface'

export class ApiTestApplication {
    private static readonly defaultOptions: ApiTestModuleOptions = {
        metadata: {
            imports: [AppModule],
        },
        database: {
            dataCleanup: true,
            targetEntities: [],
        },
        changeModules: [],
        changeProviders: [],
        buildExtra(builder: TestingModuleBuilder) {},
    }

    private runtimeOptions: ApiTestModuleOptions = Objects.deepMergeNew(
        ApiTestApplication.defaultOptions,
        {},
    )

    protected constructor() {}

    static builder(): ApiTestApplication {
        return new ApiTestApplication()
    }

    metadata(
        metadata: ModuleMetadata = ApiTestApplication.defaultOptions.metadata,
    ) {
        this.runtimeOptions.metadata = Objects.deepMergeNew(
            this.runtimeOptions.metadata,
            metadata,
        )
    }

    clearDatabase(
        options: ApiTestModuleOptions['database'],
    ): ApiTestApplication {
        this.runtimeOptions.database = Objects.updateShallow(
            this.runtimeOptions.database,
            options,
        )
        return this
    }

    changeModule(
        from: ModuleDefinition,
        to: ModuleDefinition,
    ): ApiTestApplication {
        this.runtimeOptions.changeModules.push({ from, to })
        return this
    }

    changeProvider(typeOrToken: any, value: any): ApiTestApplication {
        this.runtimeOptions.changeProviders.push({ typeOrToken, value })
        return this
    }

    extraConfigure(
        build: (builder: TestingModuleBuilder) => void,
    ): ApiTestApplication {
        this.runtimeOptions.buildExtra = build
        return this
    }

    async build(): Promise<INestApplication> {
        const { metadata, changeModules, changeProviders, database } =
            this.runtimeOptions
        const builder = Test.createTestingModule(metadata)
        for (const module of changeModules) {
            builder.overrideModule(module.from).useModule(module.to)
        }
        for (const provider of changeProviders) {
            builder
                .overrideProvider(provider.typeOrToken)
                .useValue(provider.value)
        }
        this.runtimeOptions.buildExtra(builder)

        const testModule = await builder.compile()
        testModule.useLogger(
            new ConsoleLogger(ApiTestApplication.name, {
                // logLevels: ['error', 'warn', 'debug'],
            }),
        )
        const testApp = testModule.createNestApplication()

        await configureNestApplication(testApp)
        await testApp.init()

        const { dataCleanup, targetEntities } = database
        if (dataCleanup)
            await new DatabaseCleanup(testApp, { targetEntities }).clean()

        return testApp
    }
}

export type ApiTestModuleOptions = {
    metadata?: ModuleMetadata
    database?: DatabaseCleanupOptions & { dataCleanup?: boolean }
    changeModules?: { from: ModuleDefinition; to: ModuleDefinition }[]
    changeProviders?: { typeOrToken: any; value: any }[]
    buildExtra?: (builder: TestingModuleBuilder) => void
}
