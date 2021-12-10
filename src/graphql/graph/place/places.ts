// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { Connection } from '../../types'
import { Place } from '@types'


export type PlacesArgs = {
    searchText?: string,
    category?: string[],
    pricing?: number[],
    around?: number[],
    radius?: number,
    tag?: string[],
    zip?: string[],
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
        $category: [ID!]
        $pricing: [Int!]
        $zip: [String!]
        $after: String
        $area: String
        $name: String
        $radius: Int
        $first: Int!
        $tag: [ID!]
    ) {
        places(
            searchText: $searchText
            category: $category
            pricing: $pricing
            around: $around
            radius: $radius
            after: $after
            first: $first
            name: $name
            area: $area
            zip: $zip
            tag: $tag
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