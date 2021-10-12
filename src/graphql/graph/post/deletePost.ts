// GraphQL
import { gql } from '@apollo/client'

// Types
import { Post } from '@types'


export type DeletePostArgs = {
    input: {
        id: string,
    },
}

export type DeletePostResult = {
    deletePost: {
        post: Post,
    },
}

export const DELETE_POST = gql`
    mutation DeletePost(
        $input: DeletePostInput!
    ) {
        deletePost(
            input: $input
        ) {
            post {
                id
            }
        }
    }
`