// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    creatorId?: string,
    userId?: string,
    skip?: boolean,
    after?: string,
    first: number,
    type?: string,
    tag?: string,
}

export default (args: Args) => {

    const { creatorId, userId, first, type, tag, after, skip } = args;

    const result = useQuery<
        graph.PostsResult,
        graph.PostsArgs
    >(
        graph.POSTS,
        {
            variables: {
                creatorId,
                userId,
                after,
                first,
                type,
                tag,
            },
            skip,
        }
    );

    const posts = result.data?.posts;

    return [posts, result] as [typeof posts, typeof result];
}