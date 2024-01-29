import { ValidationFailException } from '@src-support/infra/web/exception'
import {
    ValidationError,
    ValidationPipe,
    ValidationPipeOptions,
} from '@nestjs/common'

export const defaultValidationPipeOptions: ValidationPipeOptions = {
    dismissDefaultMessages: false, // Validator 기본 애러메세지 비활성
    whitelist: true, // 데코레이터 없는필드는 제외된 상태로 DTO 생성
    transform: true, // DTO 필드 타입으로 데이터 자동변환
    transformOptions: {
        enableImplicitConversion: true, // DTO 필드 타입으로 데이터 자동변환
    },

    exceptionFactory(errors: ValidationError[]) {
        const errorMap = errors.reduce(
            (errorMap, error) => ({
                ...errorMap,
                [`${error.property}`]: Object.values(error.constraints)[0],
            }),
            {},
        )
        return new ValidationFailException(
            ValidationPipe,
            errorMap,
            `[${Object.keys(errors)}]`,
        )
    },
}
