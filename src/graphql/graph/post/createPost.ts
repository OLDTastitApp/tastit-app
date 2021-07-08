// GraphQL
import { gql } from '@apollo/client'

// Types
import { Post } from '@types'


export type CreatePostArgs = {
    input: {
        userIds?: string[],
        placeId?: string,
        content: string,
        picture: string,
    },
}

export type CreatePostResult = {
    createPost: {
        post: Post,
    },
}

export const CREATE_POST = gql`
    mutation CreatePost(
        $input: CreatePostInput!
    ) {
        createPost(
            input: $input
        ) {
            post {
                id
            }
        }
    }
`