import { UniqueIdHolder } from '@src-support/infra/unique-id'
import { requires } from '@src-support/domain/validation'
import { InitialValue } from '@src-support/domain/constant'

export class TestUniqueIdHolder implements UniqueIdHolder {
    private readonly defaultSequence: string[]
    private sequenceIter: Iterator<string>

    constructor(
        defaultSequence: string[] = [InitialValue.ULID_STRING as string],
    ) {
        requires.call(
            this,
            defaultSequence.length > 0,
            () => '시퀀스 string 배열은 필수입니다.',
        )
        this.defaultSequence = [...defaultSequence]
        this.sequenceIter = this.defaultSequence[Symbol.iterator]()
    }

    random(): string {
        const next = this.sequenceIter.next()
        if (next.done) return InitialValue.ULID_STRING
        return next.value
    }

    /** 일시적인 시퀀스 값을 설정하고, 순서대로 모두 반환 후, ULID_STRING 값을 무한히 반환합니다. */
    oneTimeSequence(...sequenceIds: string[]) {
        if (sequenceIds.length === 0) return
        this.sequenceIter = sequenceIds[Symbol.iterator]()
    }

    /**
     * 생성시에 선언된 기본 string 값을 시퀀스값으로 설정하고, 기본값이 순서대로 모두 반환되면 ULID_STRING 값을 무한히
     * 반환합니다.
     */
    reset() {
        this.sequenceIter = this.defaultSequence[Symbol.iterator]()
    }
}
