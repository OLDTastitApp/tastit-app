// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { User } from '@types'


export type FollowArgs = {
    input: {
        userId: string,
    },
}

export type FollowResult = {
    follow: {
        target: User,
        user: User,
    },
}

export const FOLLOW = gql`
    mutation Follow(
        $input: FollowInput!
    ) {
        follow(
            input: $input
        ) {
            user {
                ...UserFragment
            }
            target {
                ...UserFragment
            }
        }
    }
    ${fragments.USER}
`