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
        picture?: string,
        birthdate: Date,
        phone?: string,
        email: string,
    },
}

export type SignUpResult = {
    signUp: boolean,
}

export const SIGN_UP = gql`
    mutation SignUp(
        $input: SignUpInput!
    ) {
        signUp(
            input: $input
        )
    }
`