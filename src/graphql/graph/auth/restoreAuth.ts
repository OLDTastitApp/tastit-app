// GraphQL
import { gql } from '@apollo/client'


export type RestoreAuthPayload = {
    authenticated: boolean,
    hasExpired: boolean,
}

export type RestoreAuthResult = {
    restoreAuth: RestoreAuthPayload,
}

export const RESTORE_AUTH = gql`
    mutation RestoreAuth {
        restoreAuth @client {
            authenticated
            hasExpired
        }
    }
`