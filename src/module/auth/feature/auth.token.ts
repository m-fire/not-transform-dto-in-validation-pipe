import { Objects, PlainObject } from '@src-support/infra/typescript'
import { InitialValue } from '@src-support/domain/constant'

export class AuthToken {
    readonly token: string = InitialValue.STRING
    readonly expirationTime: number = InitialValue.NUMBER

    static of(token: string, expirationTime: number): AuthToken {
        return Objects.updateShallow(new AuthToken(), {
            token,
            expirationTime,
        })
    }
}

export type AuthTokenProps = PlainObject<AuthToken>
