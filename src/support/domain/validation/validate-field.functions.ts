// 조건이 false 인 경우, Error 를 발생합니다.
export function requires(condition: boolean, getMessage?: () => string) {
    if (condition == false)
        throw new Error(`${this?.constructor.name}: ${getMessage?.()}`)
}
