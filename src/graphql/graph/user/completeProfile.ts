// GraphQL
import * as fragments from '../fragments'
import { gql } from '@apollo/client'

// Types
import { User } from '@types'


export type CompleteProfileArgs = {
    input: {
        biography?: string,
        firstName: string,
        lastName: string,
        picture?: string,
        nickname: string,
        birthdate: Date,
        email?: string,
    },
}

export type CompleteProfileResult = {
    completeProfile: {
        me: User,
    },
}

export const COMPLETE_PROFILE = gql`
    mutation CompleteProfile(
        $input: CompleteProfileInput!
    ) {
        completeProfile(
            input: $input
        ) {
            me {
                ...UserFragment
            }
        }
    }
    ${fragments.USER}
`