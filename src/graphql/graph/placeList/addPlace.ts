// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { PlaceList, Place } from '@types'


export type AddPlaceArgs = {
    input: {
        placeListId: string,
        placeId: string,
    },
}

export type AddPlaceResult = {
    addPlace: {
        placeList: PlaceList,
        place: Place,
    },
}

export const ADD_PLACE = gql`
    mutation AddPlace(
        $input: AddPlaceInput!
    ) {
        addPlace(
            input: $input
        ) {
            placeList {
                name
                id
            }
            place {
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
    }
    ${fragments.IMAGE}
`