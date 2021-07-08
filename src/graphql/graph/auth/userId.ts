// GraphQL
import { gql } from '@apollo/client'


export type UserIdResult = {
    authenticated: boolean,
    userId: string,
}

export const USER_ID = gql`
    query UserId {
        authenticated @client
        userId @client
    }
`