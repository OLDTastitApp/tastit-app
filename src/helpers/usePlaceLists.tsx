// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    skip?: boolean,
    after?: string,
    first: number,
}

export default (args: Args) => {

    const { first, after, skip } = args;

    const result = useQuery<
        graph.PlaceListsResult,
        graph.PlaceListsArgs
    >(
        graph.PLACE_LISTS,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                after,
                first,
            },
            skip,
        }
    );

    const placeLists = result.data?.placeLists;

    return [placeLists, result] as [typeof placeLists, typeof result];
}