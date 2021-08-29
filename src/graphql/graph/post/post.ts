// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { Post } from '@types'


export type PostArgs = {
    id: string,
}

export type PostResult = {
    post: Post,
}

export const POST = gql`
    query Post(
        $id: ID!
    ) {
        post(
            id: $id
        ) {
            ...PostFragment
        }
    }
    ${fragments.POST}
`