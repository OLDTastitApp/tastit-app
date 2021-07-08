// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { Place } from '@types'


export type DislikePlaceArgs = {
    input: {
        placeId: string,
    },
}

export type DislikePlaceResult = {
    dislikePlace: {
        place: Place,
    },
}

export const DISLIKE_PLACE = gql`
    mutation DislikePlace(
        $input: DislikePlaceInput!
    ) {
        dislikePlace(
            input: $input
        ) {
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