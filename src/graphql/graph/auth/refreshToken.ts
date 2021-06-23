// GraphQL
import { gql } from '@apollo/client'


export type RefreshTokenArgs = {
    input: {
        token: string,
    },
}

export type RefreshTokenResult = {
    refreshToken: {
        refreshToken: string,
        accessToken: string,
    },
}

export const REFRESH_TOKEN = gql`
    mutation RefreshToken(
        $input: RefreshTokenInput!
    ) {
        refreshToken(
            input: $input
        ) {
            refreshToken
            accessToken
        }
    }
`