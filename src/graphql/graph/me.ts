// GraphQL
import { gql } from '@apollo/client'

// Types
import { User } from '@types'


export type MeResult = {
    me: {
        favoriteCount?: number,
        followerCount?: number,
        listCount?: number,
        user: User,
        id: string,
    },
}

export const ME = gql`
    query Me {
        me {
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
            favoriteCount
            followerCount
            postCount
            id
        }
    }
`