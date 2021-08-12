// GraphQL
import * as fragments from './fragments'
import gql from 'graphql-tag'

// Types
import { User } from '@types'


export type MeResult = {
    me: User,
}

export const ME = gql`
    query Me {
        me {
            ...UserFragment
            placeListCount
            followingCount
            followerCount
            following
        }
    }
    ${fragments.USER}
`