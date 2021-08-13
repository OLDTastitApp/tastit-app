// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'

// Utils
import update from 'immutability-helper'


type MutateArgs = graph.RemovePlaceArgs['input']

export default () => {

    const [removePlace, result] = useMutation<
        graph.RemovePlaceResult,
        graph.RemovePlaceArgs
    >(graph.REMOVE_PLACE);

    const mutate = async (args: MutateArgs) => {

        const { placeListId, placeId } = args;

        const result = await removePlace({
            variables: {
                input: {
                    placeListId,
                    placeId,
                },
            },
            update: (cache, { data }) => {

                // const { place } = data.removePlace;

                const previousData = cache.readQuery<
                    graph.PlaceListItemsResult,
                    graph.PlaceListItemsArgs
                >({
                    query: graph.PLACE_LIST_ITEMS,
                    variables: {
                        placeListId,
                        first: 100,
                    },
                });

                const index = previousData.placeList.places.edges.findIndex(
                    ({ node: { id } }) => id === placeId
                );

                // const cursor = JSON.stringify({
                //     createdAt: placeList.createdAt,
                // });

                // const edge = {
                //     __typename: 'PlaceListEdge',
                //     node: placeList,
                //     author: true,
                //     cursor,
                // };

                const nextData = update(previousData, {
                    placeList: {
                        places: {
                            edges: {
                                $splice: [[index, 1]],
                            },
                        },
                    },
                });

                cache.writeQuery<graph.PlaceListItemsResult>({
                    query: graph.PLACE_LIST_ITEMS,
                    data: nextData,
                    variables: {
                        placeListId,
                        first: 100,
                    },
                });
            },
        });
    };

    return [mutate, result] as [typeof mutate, typeof result];
}