// GraphQL
import { gql } from '@apollo/client'


export type AuthenticatedPayload = boolean

export type AuthenticatedResult = {
    authenticated: AuthenticatedPayload,
}

export const AUTHENTICATED = gql`
    query Authenticated {
        authenticated @client
    }
`