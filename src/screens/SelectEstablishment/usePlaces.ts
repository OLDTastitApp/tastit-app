// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    around?: number[],
    radius?: number,
    search?: string,
    limit?: number,
    skip?: boolean,
}

export default (args: Args) => {

    const { search, around, limit, skip } = args;

    const result = useQuery<
        graph.PlacesResult,
        graph.PlacesArgs
    >(
        graph.PLACES,
        {
            variables: {
                first: limit,
                around,
                search,
            },
            skip,
        }
    );

    const places = result.data?.places;

    return [places, result] as [typeof places, typeof result];
}