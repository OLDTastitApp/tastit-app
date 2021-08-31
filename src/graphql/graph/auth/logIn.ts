// GraphQL
import { gql } from '@apollo/client'

// Types
import { User } from '@types'


export type LogInMethod =
    | 'CREDENTIALS'
    | 'FACEBOOK'
    | 'GOOGLE'
    | 'APPLE'

export type LogInArgs = {
    input: {
        accessToken: string,
        method: 'FACEBOOK',
    } | {
        accessToken: string,
        method: 'GOOGLE',
        idToken: string,
    } | {
        authorizationCode: string,
        identityToken: string,
        method: 'APPLE',
        nonce: string,
    } | {
        method: 'CREDENTIALS',
        username: string,
        password: string,
    },
}

export type LogInResult = {
    logIn: {
        refreshToken: string,
        accessToken: string,
        user: User,
    },
}

export const LOG_IN = gql`
    mutation LogIn(
        $input: LogInInput!
    ) {
        logIn(
            input: $input
        ) {
            refreshToken
            accessToken
            user {
                firstName
                roles {
                    complete
                    name
                    id
                }
                id
            }
        }
    }
`