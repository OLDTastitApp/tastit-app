// GraphQL
import gql from 'graphql-tag'

// Types
import { Connection } from '../../types'
import { PlaceList } from '@types'


export type PlaceListsArgs = {
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
    ) {
        placeLists(
            after: $after
            first: $first
        ) {
            edges {
                cursor
                node {
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
`