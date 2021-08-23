// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    searchText?: string,
    category?: string[],
    pricing?: number[],
    around?: number[],
    radius?: number,
    skip?: boolean,
    zip?: string[],
    after?: string,
    first: number,
    name?: string,
    area?: string,
    tag?: string[],
}

export default (args: Args) => {

    const { searchText, first, after, name, area, around, radius, skip } = args;
    const { category, pricing, tag, zip } = args;

    const result = useQuery<
        graph.PlacesResult,
        graph.PlacesArgs
    >(
        graph.PLACES,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                searchText,
                pricing,
                around,
                radius,
                after,
                first,
                name,
                area,
                zip,
            },
            skip,
        }
    );

    const places = result.data?.places;

    return [places, result] as [typeof places, typeof result];
}