// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { Connection } from '../../types'
import { User } from '@types'


export type FriendsArgs = {
    after?: string,
    first: number,
}

export type FriendsResult = {
    friends: Connection<User>,
}

export const FRIENDS = gql`
    query Friends(
        $after: String
        $first: Int!
    ) {
        friends(
            after: $after
            first: $first
        ) {
            edges {
                cursor
                node {
                    picture(format: "large") {
                        ...ImageFragment
                    }
                    firstName
                    lastName
                    nickname
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
    ${fragments.IMAGE}
`