// GraphQL
import gql from 'graphql-tag'

// Types
import { PlaceList } from '@types'


export type AddPlaceListArgs = {
    input: {
        code: string,
    },
}

export type AddPlaceListResult = {
    addPlaceList: {
        placeList: PlaceList,
    },
}

export const ADD_PLACE_LIST = gql`
    mutation AddPlaceList(
        $input: AddPlaceListInput!
    ) {
        addPlaceList(
            input: $input
        ) {
            placeList {
                role
                name
                id
            }
        }
    }
`