// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { Place } from '@types'


export type RatePlaceArgs = {
    input: {
        placeId: string,
        rating: number,
    },
}

export type RatePlaceResult = {
    ratePlace: {
        place: Place,
    },
}

export const RATE_PLACE = gql`
    mutation RatePlace(
        $input: RatePlaceInput!
    ) {
        ratePlace(
            input: $input
        ) {
            place {
                cover {
                    ...ImageFragment
                }
                recommendationCount
                userRating
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