// Helpers
import { useQuery } from '@apollo/client'
import * as graph from '@graphql/graph'


type Args = {
    placeListId: string,
    skip?: boolean,
    after?: string,
    first: number,
}

export default (args: Args) => {

    const { placeListId, first, after, skip } = args;

    const result = useQuery<
        graph.PlaceListItemsResult,
        graph.PlaceListItemsArgs
    >(
        graph.PLACE_LIST_ITEMS,
        {
            fetchPolicy: 'network-only',
            variables: {
                placeListId,
                after,
                first,
            },
            skip,
        }
    );

    const places = result.data?.placeList?.places;

    return [places, result] as [typeof places, typeof result];
}