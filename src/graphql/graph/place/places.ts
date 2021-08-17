// GraphQL
import * as fragments from '../fragments'
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
    name?: string,
    area?: string,
}

export type PlacesResult = {
    places: Connection<Place>,
}

export const PLACES = gql`
    query Places(
        $searchText: String
        $around: [Float!]
        $after: String
        $area: String
        $name: String
        $radius: Int
        $first: Int!
    ) {
        places(
            searchText: $searchText
            around: $around
            radius: $radius
            after: $after
            first: $first
            name: $name
            area: $area
        ) {
            edges {
                cursor
                node {
                    cover {
                        ...ImageFragment
                    }
                    longitude
                    latitude
                    address
                    rating
                    rating
                    liked
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