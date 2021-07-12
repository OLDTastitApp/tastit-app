// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { Post } from '@types'


export type DislikePostArgs = {
    input: {
        postId: string,
    },
}

export type DislikePostResult = {
    dislikePost: {
        post: Post,
    },
}

export const DISLIKE_POST = gql`
    mutation DislikePost(
        $input: DislikePostInput!
    ) {
        dislikePost(
            input: $input
        ) {
            post {
                ...PostFragment
            }
        }
    }
    ${fragments.POST}
`