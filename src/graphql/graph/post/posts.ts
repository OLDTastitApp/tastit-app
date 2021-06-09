// GraphQL
import gql from 'graphql-tag'

// Types
import { Connection } from '../../types'
import { Post } from '@types'


export type PostsArgs = {
    after?: string,
    first: number,
}

export type PostsResult = {
    posts: Connection<Post>,
}

export const POSTS = gql`
    query Posts(
        $after: String
        $first: Int!
    ) {
        posts(
            after: $after
            first: $first
        ) {
            edges {
                cursor
                node {
                    author {
                        ... on IndividualUser {
                            biography
                            username
                        }
                        cover(format: "default") {
                            reference
                            value
                            type
                            id
                        }
                        firstName
                        lastName
                        id
                    }
                    place {
                        name
                        id
                    }
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
`