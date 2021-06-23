// GraphQL
import { gql } from '@apollo/client'

// Types
import { User } from '@types'


export type SignUpArgs = {
    input: {
        firstName: string,
        lastName: string,
        password: string,
        nickname: string,
        birthdate: Date,
        email: string,
        phone: string,
    },
}

export type SignUpResult = {
    signUp: {
        refreshToken: string,
        accessToken: string,
        user: User,
    },
}

export const SIGN_UP = gql`
    mutation SignUp(
        $input: SignUpInput!
    ) {
        signUp(
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
                email
                id
            }
        }
    }
`