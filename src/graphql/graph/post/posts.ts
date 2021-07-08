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
}

export type PostsResult = {
    posts: Connection<Post>,
}

export const POSTS = gql`
    query Posts(
        $creatorId: String
        $after: String
        $first: Int!
    ) {
        posts(
            creatorId: $creatorId
            after: $after
            first: $first
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