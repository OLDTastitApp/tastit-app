// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { Connection } from '../../types'
import { PlaceList } from '@types'


export type PlaceListsArgs = {
    userId?: string,
    after?: string,
    first: number,
}

export type PlaceListsResult = {
    placeLists: Connection<PlaceList>,
}

export const PLACE_LISTS = gql`
    query PlaceLists(
        $after: String
        $first: Int!
        $userId: ID
    ) {
        placeLists(
            userId: $userId
            after: $after
            first: $first
        ) {
            edges {
                cursor
                node {
                    cover {
                        ...ImageFragment
                    }
                    count
                    role
                    name
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