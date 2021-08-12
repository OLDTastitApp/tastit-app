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

export const REFRESH_TOKEN_QUERY = `
    mutation RefreshToken(
        $token: String!
    ) {
        refreshToken(
            input: {
                token: $token
            }
        ) {
            refreshToken
            accessToken
        }
    }
`