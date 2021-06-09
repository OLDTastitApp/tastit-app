// GraphQL
import { gql } from '@apollo/client'

// Types
import { Post } from '@types'


export type AddPostArgs = {
    input: {
        content?: string,
        picture: string,
        place?: string,
    },
}

export type AddPostResult = {
    addPost: {
        post: Post,
    },
}

export const ADD_POST = gql`
    mutation AddPost(
        $input: AddPostInput!
    ) {
        addPost(
            input: $input
        ) {
            post {
                id
            }
        }
    }
`