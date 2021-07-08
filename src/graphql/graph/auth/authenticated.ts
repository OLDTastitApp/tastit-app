// GraphQL
import { gql } from '@apollo/client'

// Types
import { RoleName } from '@types'


export type AuthenticatedResult = {
    authenticated: boolean,
    userId: string,
    role: RoleName,
}

export const AUTHENTICATED = gql`
    query Authenticated {
        authenticated @client
        userId @client
        role @client
    }
`