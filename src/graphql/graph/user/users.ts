// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { Connection } from '../../types'
import { User } from '@types'


export type UsersArgs = {
    searchText?: string,
    after?: string,
    first: number,
}

export type UsersResult = {
    users: Connection<User>,
}

export const USERS = gql`
    query Users(
        $searchText: String
        $after: String
        $first: Int!
    ) {
        users(
            searchText: $searchText
            after: $after
            first: $first
        ) {
            edges {
                cursor
                node {
                    picture(format: "60x60") {
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