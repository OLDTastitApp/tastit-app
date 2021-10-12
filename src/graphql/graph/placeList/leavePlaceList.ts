// GraphQL
import gql from 'graphql-tag'

// Types
import { PlaceList } from '@types'


export type LeavePlaceListArgs = {
    input: {
        id: string,
    },
}

export type LeavePlaceListResult = {
    leavePlaceList: {
        placeList: PlaceList,
    },
}

export const LEAVE_PLACE_LIST = gql`
    mutation LeavePlaceList(
        $input: LeavePlaceListInput!
    ) {
        leavePlaceList(
            input: $input
        ) {
            placeList {
                id
            }
        }
    }
`