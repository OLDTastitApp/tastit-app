// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    skip?: boolean,
    search: string,
    limit?: number,
}

export default (args: Args) => {

    const { search, limit, skip } = args;

    const result = useQuery<
        graph.PlacesResult,
        graph.PlacesArgs
    >(
        graph.PLACES,
        {
            variables: {
                first: limit,
                search,
            },
            skip,
        }
    );

    const places = result.data?.places;

    return [places, result] as [typeof places, typeof result];
}