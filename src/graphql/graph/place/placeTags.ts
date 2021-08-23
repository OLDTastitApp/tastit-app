// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { Tag } from '@types'


export type PlaceTagsResult = {
    placeTags: Tag[],
}

export const PLACE_TAGS = gql`
    query PlaceTags {
        placeTags {
            ...TagFragment
        }
    }
    ${fragments.TAG}
`