// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { User } from '@types'


export type UserArgs = {
    id: string,
}

export type UserResult = {
    user: User,
}

export const USER = gql`
    query User(
        $id: ID!
    ) {
        user(
            id: $id
        ) {
            ...UserFragment
            placeListCount
            followingCount
            followerCount
            following
        }
    }
    ${fragments.USER}
`