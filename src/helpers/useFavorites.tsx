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
        graph.FavoritesResult,
        graph.FavoritesArgs
    >(
        graph.FAVORITES,
        {
            fetchPolicy: 'cache-and-network',
            variables: {
                after,
                first,
            },
            skip,
        }
    );

    const favorites = result.data?.favorites;

    return [favorites, result] as [typeof favorites, typeof result];
}