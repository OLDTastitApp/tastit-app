// GraphQL
import * as fragments from '../fragments'
import { gql } from '@apollo/client'

// Types
import { User } from '@types'


export type UpdateProfileArgs = {
    input: {
        // patch: {
            biography?: string,
            firstName?: string,
            lastName?: string,
            picture?: string,
        // },
        // id?: string,
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