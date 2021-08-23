// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { Tag } from '@types'


export type PlaceCategoriesResult = {
    placeCategories: Tag[],
}

export const PLACE_CATEGORIES = gql`
    query PlaceCategories {
        placeCategories {
            ...TagFragment
        }
    }
    ${fragments.TAG}
`