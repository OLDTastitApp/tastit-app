// GraphQL
import * as fragments from '../fragments'
import { gql } from '@apollo/client'

// Types
import { User } from '@types'


export type UpdateProfileArgs = {
    input: {
        biography?: string,
        firstName?: string,
        lastName?: string,
        picture?: string,
    },
}

export type UpdateProfileResult = {
    updateProfile: {
        me: User,
    },
}

export const UPDATE_PROFILE = gql`
    mutation UpdateProfile(
        $input: UpdateProfileInput!
    ) {
        updateProfile(
            input: $input
        ) {
            me {
                ...UserFragment
            }
        }
    }
    ${fragments.USER}
`