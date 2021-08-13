// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { PlaceList, Place } from '@types'


export type RemovePlaceArgs = {
    input: {
        placeListId: string,
        placeId: string,
    },
}

export type RemovePlaceResult = {
    removePlace: {
        place: Place,
    },
}

export const REMOVE_PLACE = gql`
    mutation RemovePlace(
        $input: RemovePlaceInput!
    ) {
        removePlace(
            input: $input
        ) {
            place {
                id
            }
        }
    }
`