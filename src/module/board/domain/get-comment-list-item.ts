import { InitialValue } from '@src-support/domain/constant'
import { Objects } from '@src-support/infra/typescript'
import { UserProps } from '@src-module/user/domain'
import { CommentProps } from '@src-module/board/domain'

export class GetCommentListItem implements CommentListItemProps {
    readonly nickname: string = InitialValue.STRING
    readonly profileImage: string | null = null
    readonly writeDatetime: string = InitialValue.STRING
    readonly content: string = InitialValue.STRING

    static create(props: CommentListItemProps) {
        return Objects.updateShallow(new GetCommentListItem(), props)
    }
}

export type CommentListItemProps = Pick<
    UserProps & CommentProps,
    'nickname' | 'profileImage' | 'writeDatetime' | 'content'
>
