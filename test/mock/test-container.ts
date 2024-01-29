import { TestDateTimeHolder, TestUniqueIdHolder } from '@test-support/mock'
import {
    TestBoardRepository,
    TestCommentRepository,
    TestImageRepository,
    TestUserRepository,
} from '@test-root/mock/repository'

export class TestContainer {
    constructor(
        readonly uniqueIdHolder = new TestUniqueIdHolder(),
        readonly dateTimeHolder = new TestDateTimeHolder(),
    ) {}

    readonly userRepository = new TestUserRepository()
    readonly imageRepository = new TestImageRepository()
    readonly boardRepository = new TestBoardRepository(
        this.userRepository,
        this.uniqueIdHolder,
    )
    readonly commentRepository = new TestCommentRepository()
}
