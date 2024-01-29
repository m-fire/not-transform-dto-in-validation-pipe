import deepmerge from 'deepmerge'

export abstract class Objects {
    // 주의! `target` 이 class 인 경우 초기화 하지 않은 field 는 모두 undefined 입니다.
    // (값 할당 전까지 필드가 존재하지 않는 JS Class 특성) 따라서 생성자, setter 를 통해 반드시
    // 초기화 과정을 거쳐 필드가 존재해야 매핑이 가능합니다. issue ref:
    // https://stackoverflow.com/questions/55161004/typescript-class-with-public-properties-results-in-an-empty-javascript-object
    static updateShallow<T, S>(target: T, ...sources: S[]): T {
        const propNames = Object.getOwnPropertyNames(target)
        if (propNames.length === 0) this.throwRequireInitializedField(target)

        for (const source of sources) {
            for (const propName of propNames) {
                if (source[propName] === undefined) continue
                if (typeof source[propName] === 'object') {
                    target[propName] = source[propName]
                    continue
                }
                target[propName] = source[propName]
            }
        }

        return target
    }

    private static throwRequireInitializedField(target: any) {
        throw new Error(
            `${this.name}: 'target:${target?.constructor.name}': ` +
                `target 이 class 인 경우, 반드시 필드값을 초기화 해야 매핑이 가능합니다.`,
        )
    }

    static deepMergeNew<A, B, C extends any>(
        first: A,
        second: B,
        options: deepmerge.Options = {
            arrayMerge: (firsts, seconds) => [...firsts, ...seconds],
        },
    ): A & B {
        return deepmerge<A, B>(first, second, options)
    }
}
