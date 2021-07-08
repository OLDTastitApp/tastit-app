// GraphQL
import { gql } from '@apollo/client'


export const IMAGE = gql`
    fragment ImageFragment on Image {
        format
        height
        width
        url
        key
        id
    }
`

export const USER = gql`
    fragment UserFragment on User {
        picture(format: "60x60") {
            ...ImageFragment
        }
        firstName
        lastName
        nickname
        id
    }
    ${IMAGE}
`

export const PLACE = gql`
    fragment PlaceFragment on Place {
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
    ${IMAGE}
`

export const POST = gql`
    fragment PostFragment on Post {
        picture {
            ...ImageFragment
        }
        creator {
            ...UserFragment
        }
        place {
            name
            id
        }
        content
        liked
        id
    }
    ${IMAGE}
    ${USER}
`