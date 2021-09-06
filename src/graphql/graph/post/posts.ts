// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { Connection } from '../../types'
import { Post } from '@types'


export type PostsArgs = {
    creatorId?: string,
    userId?: string,
    after?: string,
    first: number,
    type?: string,
    tag?: string,
}

export type PostsResult = {
    posts: Connection<Post>,
}

export const POSTS = gql`
    query Posts(
        $creatorId: String
        $userId: String
        $after: String
        $type: String
        $first: Int!
        $tag: String
    ) {
        posts(
            creatorId: $creatorId
            userId: $userId
            after: $after
            first: $first
            type: $type
            tag: $tag
        ) {
            edges {
                cursor
                node {
                    ...PostFragment
                }
            }
            pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
            }
        }
    }
    ${fragments.POST}
`