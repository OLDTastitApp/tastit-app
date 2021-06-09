// GraphQL
import { gql } from '@apollo/client'

// Types
import { OAuth } from '@services'


type SocialMethod =
    | 'facebook'
    | 'google'
    | 'apple'

export type LogInArgs = {
    input: {
        scope: 'individual' | 'professional',
    } & ({
        method: SocialMethod,
    } | {
        method: 'phone',
        phone: string,
        pin: string,
    } | {
        method: 'credentials',
        password: string,
        email: string,
    }),
}

export type LogInPayload = {
    token: OAuth.Token,
}

export type LogInResult = {
    logIn: LogInPayload,
}

export const LOG_IN = gql`
    mutation LogIn(
        $input: LogInInput!
    ) {
        logIn(
            input: $input
        ) @client {
            token {
                accessTokenExpiresAt
                refreshToken
                accessToken
                expiresIn
                tokenType
                scope
            }
        }
    }
`