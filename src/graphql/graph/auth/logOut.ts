// GraphQL
import { gql } from '@apollo/client'


export type LogOutPayload = {
    authenticated: boolean,
}

export type LogOutResult = {
    logOut: LogOutPayload,
}

export const LOG_OUT = gql`
    mutation LogOut {
        logOut @client {
            authenticated
        }
    }
`