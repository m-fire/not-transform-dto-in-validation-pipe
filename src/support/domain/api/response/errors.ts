const commonErrorMap = {
    NotFound: {
        errorCode: 'NF',
        message: '찾을 수 없습니다.',
    },
    Duplicated: {
        errorCode: 'DU',
        message: '중복되었습니다.',
    },
    SignInFail: {
        errorCode: 'SIF',
        message: '로그인 할 수 없습니다.',
    },
    ValidationFail: {
        errorCode: 'VF',
        message: '유효하지 않습니다.',
    },
    AuthorizationFail: {
        errorCode: 'AF',
        message: '승인되지 않았습니다.',
    },
    NoPermission: {
        errorCode: 'NP',
        message: '권한이 없습니다.',
    },
    DatabaseError: {
        errorCode: 'DBE',
        message: 'Database 처리 문제입니다.',
    },
    NotAllowed: {
        errorCode: 'NA',
        message: '허용되지 않았습니다.',
    },
} as const

export type ErrorType = keyof typeof commonErrorMap

export type ErrorData<K extends ErrorType> = (typeof commonErrorMap)[K]

export type ErrorCode<K extends ErrorType> =
    (typeof commonErrorMap)[K]['errorCode']

export type ErrorMessage<K extends ErrorType> =
    (typeof commonErrorMap)[K]['message']

export class Errors {
    static of<K extends ErrorType>(type: K): ErrorData<K> {
        return { ...commonErrorMap[type] }
    }
}
