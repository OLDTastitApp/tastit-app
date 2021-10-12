// GraphQL
import gql from 'graphql-tag'


export type SharePlaceListArgs = {
    input: {
        id: string,
    },
}

export type SharePlaceListResult = {
    sharePlaceList: {
        expiresAt?: Date,
        code: string,
    },
}

export const SHARE_PLACE_LIST = gql`
    mutation SharePlaceList(
        $input: SharePlaceListInput!
    ) {
        sharePlaceList(
            input: $input
        ) {
            expiresAt
            code
        }
    }
`