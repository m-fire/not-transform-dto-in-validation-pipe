import { Injectable } from '@nestjs/common'
import { Sequence } from '@src-support/infra/typescript'
import { SequenceHolder } from '@src-support/infra/sequence/sequence.holder'

@Injectable()
export class DefaultSequenceHolder implements SequenceHolder {
    private readonly seq = new Sequence(0)

    next(): number {
        return this.seq.next()
    }

    reset(): void {
        this.seq.reset()
    }
}
