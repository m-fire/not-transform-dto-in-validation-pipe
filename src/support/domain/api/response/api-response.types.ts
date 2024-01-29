export interface Response<T> {
    result: ResponseType
    data?: T
}

export type ResponseType = 'SUCCESS' | 'FAIL'

export type ResponseMessages<K extends ResponseType> = K extends 'SUCCESS'
    ? '요청이 정상처리 되었습니다.'
    : K extends 'FAIL'
      ? '응답에 실패했습니다.'
      : undefined
