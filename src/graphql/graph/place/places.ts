// GraphQL
import gql from 'graphql-tag'

// Types
import { Connection } from '../../types'
import { Establishment } from '@types'


type Place = Establishment

export type PlacesArgs = {
    around?: number[],
    cursor?: string,
    search?: string,
    first: number,
}

export type PlacesResult = {
    places: Connection<Place>,
}

export const PLACES = gql`
    query Places(
        $around: [Float!]
        $cursor: String
        $search: String
        $first: Int!
    ) {
        places(
            around: $around
            search: $search
            after: $cursor
            first: $first
        ) {
            edges {
                cursor
                node {
                    cover(format: "default") {
                        value
                        type
                    }
                    location
                    address
                    rating
                    rating
                    types
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