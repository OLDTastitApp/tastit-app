// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    after?: string,
    skip?: boolean,
    first: number,
    text?: string,
}

export default (args: Args) => {

    const { first, after, text, skip } = args;

    const result = useQuery<
        graph.SearchResult,
        graph.SearchArgs
    >(
        graph.SEARCH,
        {
            variables: {
                first,
                after,
                text,
            },
            skip,
        }
    );

    const search = result.data?.search;

    return [search, result] as [typeof search, typeof result];
}