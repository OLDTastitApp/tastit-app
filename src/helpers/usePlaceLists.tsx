// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    userId?: string,
    skip?: boolean,
    after?: string,
    first: number,
}

export default (args: Args) => {

    const { userId, first, after, skip } = args;

    const result = useQuery<
        graph.PlaceListsResult,
        graph.PlaceListsArgs
    >(
        graph.PLACE_LISTS,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                userId,
                after,
                first,
            },
            skip,
        }
    );

    const placeLists = result.data?.placeLists;

    return [placeLists, result] as [typeof placeLists, typeof result];
}