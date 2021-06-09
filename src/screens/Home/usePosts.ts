// Apollo
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


export default (args: graph.MyPostsArgs) => {

    const result = useQuery<
        graph.PostsResult,
        graph.PostsArgs
    >(
        graph.POSTS,
        { variables: args }
    );

    const posts = result.data?.posts;

    type FetchMoreArgs = Partial<graph.MyPostsArgs>

    const fetchMore = (args: FetchMoreArgs = {}) => {
        return result.fetchMore({
            variables: {
                after: posts?.pageInfo.endCursor,
                ...args,
            },
        })
    };

    return [posts, fetchMore, result] as [
        typeof posts, typeof fetchMore, typeof result
    ];
}
