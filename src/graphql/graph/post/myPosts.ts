// GraphQL
import gql from 'graphql-tag'

// Types
import { Connection } from '../../types'
import { Post } from '@types'


export type MyPostsArgs = {
    after?: string,
    first: number,
}

export type MyPostsResult = {
    me: {
        posts: Connection<Post>,
    },
}

export const MY_POSTS = gql`
    query MyPosts(
        $after: String
        $first: Int!
    ) {
        me {
            posts(
                after: $after
                first: $first
            ) {
                edges {
                    cursor
                    node {
                        picture(format: "default") {
                            value
                            type
                        }
                        content
                        id
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
    }
`