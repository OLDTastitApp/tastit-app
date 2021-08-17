// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { Connection } from '../../types'
import { Post } from '@types'


export type PostsArgs = {
    creatorId?: string,
    after?: string,
    first: number,
    tag?: string,
}

export type PostsResult = {
    posts: Connection<Post>,
}

export const POSTS = gql`
    query Posts(
        $creatorId: String
        $after: String
        $first: Int!
        $tag: String
    ) {
        posts(
            creatorId: $creatorId
            after: $after
            first: $first
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