// GraphQL
import gql from 'graphql-tag'

// Types
import { Connection } from '../../types'
import { Place } from '@types'


export type PlacesArgs = {
    searchText?: string,
    around?: number[],
    radius?: number,
    after?: string,
    first: number,
}

export type PlacesResult = {
    places: Connection<Place>,
}

export const PLACES = gql`
    query Places(
        $searchText: String
        $around: [Float!]
        $after: String
        $first: Int!
    ) {
        places(
            searchText: $searchText
            around: $around
            after: $after
            first: $first
        ) {
            edges {
                cursor
                node {
                    longitude
                    latitude
                    address
                    rating
                    rating
                    cover
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