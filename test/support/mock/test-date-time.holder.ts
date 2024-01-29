import { DateTimeHolder } from '@src-support/infra/datetime'
import { InitialValue } from '@src-support/domain/constant'

export class TestDateTimeHolder implements DateTimeHolder {
    milliSeconds(): number {
        return InitialValue.MILLISECONDS
    }
}
