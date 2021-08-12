// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { User } from '@types'


export type UnfollowArgs = {
    input: {
        userId: string,
    },
}

export type UnfollowResult = {
    follow: {
        target: User,
        user: User,
    },
}

export const UNFOLLOW = gql`
    mutation Unfollow(
        $input: UnfollowInput!
    ) {
        unfollow(
            input: $input
        ) {
            user {
                ...UserFragment
                followingCount
                followerCount
            }
            target {
                ...UserFragment
                followingCount
                followerCount
                following
            }
        }
    }
    ${fragments.USER}
`