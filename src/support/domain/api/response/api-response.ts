import { Response, ResponseType } from './api-response.types'

export class ApiResponse<T> implements Response<T> {
    readonly result: ResponseType
    readonly data?: T

    protected constructor() {}

    static successOf<T>(data?: T): ApiResponse<T> {
        return {
            result: 'SUCCESS',
            data: data,
        }
    }

    static failOf<T>(data?: T): ApiResponse<T> {
        return {
            result: 'FAIL',
            data: data,
        }
    }

    static emptyOf() {
        return null
    }
}
