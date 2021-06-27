// GraphQL
import gql from 'graphql-tag'

// Types
import { PlaceList } from '@types'


export type PlaceListItemsArgs = {
    placeListId: string,
    after?: string,
    first: number,
}

export type PlaceListItemsResult = {
    placeList: PlaceList,
}

export const PLACE_LIST_ITEMS = gql`
    query PlaceListItems(
        $placeListId: ID!
        $after: String
        $first: Int!
    ) {
        placeList(
            id: $placeListId
        ) {
            places(
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
            name
            id
        }
    }
`