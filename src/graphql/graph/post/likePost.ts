// GraphQL
import * as fragments from '../fragments'
import gql from 'graphql-tag'

// Types
import { Post } from '@types'


export type LikePostArgs = {
    input: {
        postId: string,
    },
}

export type LikePostResult = {
    likePost: {
        post: Post,
    },
}

export const LIKE_POST = gql`
    mutation LikePost(
        $input: LikePostInput!
    ) {
        likePost(
            input: $input
        ) {
            post {
                ...PostFragment
            }
        }
    }
    ${fragments.POST}
`