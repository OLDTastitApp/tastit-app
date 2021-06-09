// GraphQL
import { gql } from '@apollo/client'


export type SendPhoneCodeArgs = {
    input: {
        phone: string,
    },
}

export type SendPhoneCodePayload = {
    phone: string,
}

export type SendPhoneCodeResult = {
    sendPhoneCode: SendPhoneCodePayload,
}

export const SEND_PHONE_CODE = gql`
    mutation SendPhoneCode(
        $input: SendPhoneCodeInput!
    ) {
        sendPhoneCode(
            input: $input
        ) @client {
            phone
        }
    }
`