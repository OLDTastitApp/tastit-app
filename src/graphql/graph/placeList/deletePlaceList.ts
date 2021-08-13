// GraphQL
import gql from 'graphql-tag'

// Types
import { PlaceList } from '@types'


export type DeletePlaceListArgs = {
    input: {
        id: string,
    },
}

export type DeletePlaceListResult = {
    deletePlaceList: {
        placeList: PlaceList,
    },
}

export const DELETE_PLACE_LIST = gql`
    mutation DeletePlaceList(
        $input: DeletePlaceListInput!
    ) {
        deletePlaceList(
            input: $input
        ) {
            placeList {
                name
                id
            }
        }
    }
`