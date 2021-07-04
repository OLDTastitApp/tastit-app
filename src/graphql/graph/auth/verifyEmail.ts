// GraphQL
import { gql } from '@apollo/client'


export type VerifyEmailArgs = {
    input: {
        token: string,
    },
}

export type VerifyEmailResult = {
    verifyEmail: boolean,
}

export const VERIFY_EMAIL = gql`
    mutation VerifyEmail(
        $input: VerifyEmailInput!
    ) {
        verifyEmail(
            input: $input
        )
    }
`