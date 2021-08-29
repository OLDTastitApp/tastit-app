// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    skip?: boolean,
    id: string,
}

export default (args: Args) => {

    const { skip, id } = args;

    const result = useQuery<
        graph.PostResult,
        graph.PostArgs
    >(
        graph.POST,
        {
            variables: {
                id,
            },
            skip,
        }
    );

    const post = result.data?.post;

    return [post, result] as [typeof post, typeof result];
}