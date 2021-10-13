// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { Connection } from '../../types'
import { Place, Post, User } from '@types'


export type SearchArgs = {
    after?: string,
    first: number,
    text?: string,
}

export type SearchResult = {
    search: Connection<Place | Post | User>,
}

export const SEARCH = gql`
    query Search(
        $after: String
        $text: String
        $first: Int!
    ) {
        search(
            after: $after
            first: $first
            text: $text
        ) {
            edges {
                cursor
                node {
                    ... on Place {
                        cover {
                            ...ImageFragment
                        }
                        name
                        id
                    }
                    ... on User {
                        picture(format: "large") {
                            ...ImageFragment
                        }
                        roles {
                            complete
                            name
                            id
                        }
                        biography
                        firstName
                        lastName
                        nickname
                        id
                    }
                    ... on Post {
                        picture {
                            ...ImageFragment
                        }
                        creator {
                            ...UserFragment
                        }
                        place {
                            name
                            id
                        }
                        content
                        tags
                        id
                    }
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
    ${fragments.IMAGE}
    ${fragments.USER}
`