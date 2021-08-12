// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { Connection } from '../../types'
import { Place } from '@types'


export type FavoritesArgs = {
    after?: string,
    first: number,
}

export type FavoritesResult = {
    favorites: Connection<Place>,
}

export const FAVORITES = gql`
    query Favorites(
        $after: String
        $first: Int!
    ) {
        favorites(
            after: $after
            first: $first
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