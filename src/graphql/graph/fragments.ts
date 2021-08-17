// GraphQL
import { gql } from '@apollo/client'


export const IMAGE = gql`
    fragment ImageFragment on Image {
        height
        width
        url
    }
`

export const USER = gql`
    fragment UserFragment on User {
        picture(format: "large") {
            ...ImageFragment
        }
        biography
        firstName
        lastName
        nickname
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
        tags
        id
    }
    ${IMAGE}
    ${USER}
`

export const PLACE = gql`
    fragment PlaceFragment on Place {
        cover {
            ...ImageFragment
        }
        posts(
            first: 5
        ) {
            ...PostFragment
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
    ${POST}
`