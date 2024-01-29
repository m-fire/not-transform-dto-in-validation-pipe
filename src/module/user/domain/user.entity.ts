import { Column, Entity, PrimaryColumn } from 'typeorm'
import { StringIdEntity } from '@src-support/infra/data/typeorm'
import { InitialValue, Messages } from '@src-support/domain/constant/enums'
import { requires } from '@src-support/domain/validation/validate-field.functions'
import {
    NonReadonly,
    Objects,
    PlainObject,
} from '@src-support/infra/typescript'

@Entity({ name: 'users' })
export class UserEntity extends StringIdEntity {
    @PrimaryColumn({ name: 'email' })
    readonly email: string = InitialValue.STRING

    @Column({ name: 'password', length: 60 })
    readonly password: string = InitialValue.STRING

    @Column({ name: 'nickname', length: 30 })
    readonly nickname: string = InitialValue.STRING

    @Column({ name: 'tel_number' })
    readonly telNumber: string = InitialValue.STRING

    @Column({ name: 'address' })
    readonly address: string = InitialValue.STRING

    @Column({ name: 'address_detail', nullable: true })
    readonly addressDetail: string | null = null

    @Column({ name: 'profile_image', nullable: true })
    readonly profileImage: string | null = null

    @Column({ name: 'agreed_personal' })
    readonly agreedPersonal: boolean = false

    validate() {
        const require: typeof requires = requires.bind(this)
        require(this.email?.length > 0, () =>
            `[email] ${Messages.REQUIRE_VALUE}`)
        require(this.password?.length > 0, () =>
            `[password] ${Messages.REQUIRE_VALUE}`)
        require(this.nickname?.length > 0, () =>
            `[nickname] ${Messages.REQUIRE_VALUE}`)
        require(this.telNumber?.length > 0, () =>
            `[telNumber] ${Messages.REQUIRE_VALUE}`)
        require(this.address?.length > 0, () =>
            `[address] ${Messages.REQUIRE_VALUE}`)
        require(this.agreedPersonal === true, () =>
            `[agreedPersonal] 약관동의는 ${Messages.REQUIRE_VALUE}`)
    }

    assignId(id: string): this {
        ;(this as NonReadonly<typeof this>).email = id
        super.assignId(id)
        return this
    }

    change(props: UpdateUserProps): this {
        Object.assign(this, props)
        return this
    }

    handleAfterLoad() {
        super.handleAfterLoad()
        this.assignId(this.email)
    }

    static create(props: UserProps): UserEntity {
        return Objects.updateShallow(new UserEntity(), props)
    }
}

export type UserProps = PlainObject<UserEntity, keyof StringIdEntity>

export type UpdateUserProps = Partial<Omit<UserProps, 'email'>>
