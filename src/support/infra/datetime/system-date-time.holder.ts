import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { DateTimeHolder } from './date-time.holder'

@Injectable()
export class SystemDateTimeHolder implements DateTimeHolder {
    milliSeconds(): number {
        return Date.now()
    }

    // Format Docs: https://day.js.org/docs/en/display/format
    static format(
        date: number | string | Date,
        options: DayJsFormatOptions = { template: 'YYYY-MM-DD HH:mm:ss' },
    ): string {
        let from: Date
        if (typeof date === 'string') {
            from = new Date(parseInt(date))
        } else {
            from = new Date(date)
        }
        return dayjs(from).format(options.template)
    }
}

export type DayJsFormatOptions = {
    template: string
}
