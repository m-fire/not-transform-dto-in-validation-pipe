export class Sequence {
    private sequence: number

    constructor(initialSequenceNumber: number) {
        this.sequence = initialSequenceNumber
    }

    next(): number {
        return ++this.sequence
    }

    reset() {
        this.sequence = 0
    }
}
