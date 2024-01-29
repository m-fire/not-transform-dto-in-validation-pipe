import { GetCommentListItem } from './get-comment-list-item'
import { PlainObject } from '@src-support/infra/typescript'

export class GetCommentListResponse {
    readonly comments: GetCommentListItem[] = []

    static of(commentListItems: GetCommentListItem[]) {
        const response = new GetCommentListResponse()
        response.comments.push(...commentListItems)
        return response
    }
}

export type GetCommentListProps = PlainObject<GetCommentListResponse>
