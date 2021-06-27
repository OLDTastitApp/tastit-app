// GraphQL
import gql from 'graphql-tag'

// Types
import { PlaceList } from '@types'


export type CreatePlaceListArgs = {
    input: {
        name: string,
    },
}

export type CreatePlaceListResult = {
    createPlaceList: {
        placeList: PlaceList,
    },
}

export const CREATE_PLACE_LIST = gql`
    mutation CreatePlaceList(
        $input: CreatePlaceListInput!
    ) {
        createPlaceList(
            input: $input
        ) {
            placeList {
                name
                id
            }
        }
    }
`