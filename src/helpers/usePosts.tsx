// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    creatorId?: string,
    skip?: boolean,
    after?: string,
    first: number,
}

export default (args: Args) => {

    const { creatorId, first, after, skip } = args;

    const result = useQuery<
        graph.PostsResult,
        graph.PostsArgs
    >(
        graph.POSTS,
        {
            variables: {
                creatorId,
                after,
                first,
            },
            skip,
        }
    );

    const posts = result.data?.posts;

    return [posts, result] as [typeof posts, typeof result];
}