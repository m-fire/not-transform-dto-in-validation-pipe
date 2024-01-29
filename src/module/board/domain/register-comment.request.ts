import { InitialValue, Messages } from '@src-support/domain/constant'
import {
    AuthorizationFailException,
    NoPermissionException,
} from '@src-support/infra/web/exception'
import { IsNotEmpty } from 'class-validator'
import { PlainObject } from '@src-support/infra/typescript'
import {
    CommentEntity,
    CommentProps,
    UpdateCommentProps,
} from '@src-module/board/domain/index'

export class RegisterCommentRequest implements Pick<CommentProps, 'content'> {
    @IsNotEmpty({ message: Messages.REQUIRE_INPUT })
    readonly content: string = InitialValue.STRING

    toModel(props: Omit<UpdateCommentProps, 'content'>): CommentEntity {
        const comment = new CommentEntity()
        const props1 = { ...props, content: this.content }
        comment.change(props1)
        return comment
    }

    static throwAuthorizationFail(email: string, datasource: any) {
        throw new AuthorizationFailException(this, email)
    }

    static throwNoCommentPermission(email: string, datasource: any) {
        throw new NoPermissionException(
            this,
            email,
            (defaultMessage) => `댓글 작성 ${defaultMessage}`,
        )
    }
}

export type RegisterCommentProps = PlainObject<RegisterCommentRequest>
