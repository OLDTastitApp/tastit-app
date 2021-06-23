// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    searchText?: string,
    skip?: boolean,
    after?: string,
    first: number,
}

export default (args: Args) => {

    const { searchText, first, after, skip } = args;

    const result = useQuery<
        graph.PlacesResult,
        graph.PlacesArgs
    >(
        graph.PLACES,
        {
            variables: {
                searchText,
                after,
                first,
            },
            skip,
        }
    );

    const places = result.data?.places;

    return [places, result] as [typeof places, typeof result];
}