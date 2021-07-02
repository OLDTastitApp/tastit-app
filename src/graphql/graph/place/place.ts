// GraphQL
import { IMAGE_FRAGMENT } from '../image'
import gql from 'graphql-tag'

// Types
import { Place } from '@types'


export type PlaceArgs = {
    id: string,
}

export type PlaceResult = {
    place: Place,
}

export const PLACE = gql`
    query Place(
        $id: ID!
    ) {
        place(
            id: $id
        ) {
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
    ${IMAGE_FRAGMENT}
`