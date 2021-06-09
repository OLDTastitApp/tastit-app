// GraphQL
import { gql } from '@apollo/client'

// Types
import { User } from '@types'


export type UpdateProfileArgs = {
    input: {
        patch: {
            biography?: string,
            firstName?: string,
            lastName?: string,
            cover?: string,
        },
        id?: string,
    },
}

export type UpdateProfileResult = {
    updateProfile: {
        user: User,
    },
}

export const UPDATE_PROFILE = gql`
    mutation UpdateProfile(
        $input: UpdateProfileInput!
    ) {
        updateProfile(
            input: $input
        ) {
            user {
                ... on IndividualUser {
                    biography
                    username
                }
                cover(format: "default") {
                    reference
                    value
                    type
                    id
                }
                firstName
                lastName
                id
            }
        }
    }
`