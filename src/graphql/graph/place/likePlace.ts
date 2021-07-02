// GraphQL
import { IMAGE_FRAGMENT } from '../image'
import gql from 'graphql-tag'

// Types
import { Place } from '@types'


export type LikePlaceArgs = {
    input: {
        placeId: string,
    },
}

export type LikePlaceResult = {
    likePlace: {
        place: Place,
    },
}

export const LIKE_PLACE = gql`
    mutation LikePlace(
        $input: LikePlaceInput!
    ) {
        likePlace(
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
    ${IMAGE_FRAGMENT}
`