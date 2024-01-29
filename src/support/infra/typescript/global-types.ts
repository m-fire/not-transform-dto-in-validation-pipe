export type Constructor<T = any> = new (...args: any[]) => T

/**
 * <h3>T 의 (key:value) 중 `value 타입`에 해당하는 keys 로 타입선언</h3>
 * <p>ex: type MouseEventType = ExtractKey〈GlobalEventHandlersEventMap, MouseEvent〉</p>
 * @author mfire
 */
export type ExtractKey<T, K> = {
    [P in keyof T]: T[P] extends K ? P : never
}[keyof T]

export type PickKeysByType<T, U> = string &
    keyof {
        [P in keyof T as T[P] extends U ? P : never]: T[P]
    }

/**
 * <h3>재귀적으로 T 와 포함된 T의 모든 속성들을 선택적 옵션 '?' 으로 변경</h3>
 */
export type DeepPartial<T> =
    | T
    | (T extends Array<infer U>
          ? DeepPartial<U>[]
          : T extends Map<infer K, infer V>
            ? Map<DeepPartial<K>, DeepPartial<V>>
            : T extends Set<infer M>
              ? Set<DeepPartial<M>>
              : T extends object
                ? {
                      [K in keyof T]?: DeepPartial<T[K]>
                  }
                : T)

/**
 * <h3>T의 속성들을 'non-readonly' 로 변경</h3>
 */
export type NonReadonly<T> = { -readonly [P in keyof T]: T[P] }
/**
 * <h3>재귀적으로 T 와 포함된 T의 모든 속성들을 'non-readonly' 로 변경</h3>
 */
export type NonReadonlyDeep<T> = {
    -readonly [P in keyof T]: NonReadonlyDeep<T[P]>
}

export type PlainObject<T, OMIT_KEYS extends keyof any = keyof object> = Omit<
    T,
    PickKeysByType<T, Function> | OMIT_KEYS
>

export type ChangeProps<T, P, U> = {
    [K in keyof T]: T[K] extends P | null | undefined
        ? U | Extract<T[K], null | undefined>
        : T[K]
}

export type IterableElement<C extends Iterable<any>> = C extends Iterable<
    infer C
>
    ? C
    : never

export type IsArray<T> = T extends any[] | null | undefined ? true : never

export type BuiltinObjects =
    // | Object
    // | Array<any>
    // | Function
    | Error
    | EvalError
    | RangeError
    | ReferenceError
    | SyntaxError
    | TypeError
    | URIError
    | ArrayBuffer
    | boolean
    | DataView
    | Date
    | Float32Array
    | Float64Array
    | Int8Array
    | Int16Array
    | Int32Array
    | Map<any, any>
    | number
    | Promise<any>
    | RegExp
    | Set<any>
    | string
    | symbol
    | Uint8Array
    | Uint8ClampedArray
    | Uint16Array
    | Uint32Array
    | WeakMap<any, any>
    | WeakSet<any>
    | JSON
    | Math
//| Global
//| Iterator
//| Generator
//| GeneratorFunction
//| AsyncGenerator
//| AsyncGeneratorFunction
