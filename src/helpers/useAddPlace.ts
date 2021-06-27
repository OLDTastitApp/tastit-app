// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'

// Utils
import update from 'immutability-helper'


type MutateArgs = graph.AddPlaceArgs['input']

export default () => {

    const [createPlaceList, result] = useMutation<
        graph.AddPlaceResult,
        graph.AddPlaceArgs
    >(graph.ADD_PLACE);

    const mutate = async (args: MutateArgs) => {

        const { placeListId, placeId } = args;

        const result = await createPlaceList({
            variables: {
                input: {
                    placeListId,
                    placeId,
                },
            },
            // update: (cache, { data }) => {

            //     const { placeList } = data.createPlaceList;

            //     const previousData = cache.readQuery<
            //         graph.PlaceListsResult,
            //         graph.PlaceListsArgs
            //     >({
            //         query: graph.PLACE_LISTS,
            //         variables: {
            //             first: 100,
            //         },
            //     });

            //     const cursor = JSON.stringify({
            //         createdAt: placeList.createdAt,
            //     });

            //     const edge = {
            //         __typename: 'PlaceListEdge',
            //         node: placeList,
            //         author: true,
            //         cursor,
            //     };

            //     const nextData = update(previousData, {
            //         placeLists: {
            //             pageInfo: {
            //                 startCursor: {
            //                     $set: cursor,
            //                 },
            //             },
            //             edges: {
            //                 $splice: [[0, 0, edge]],
            //             },
            //         },
            //     });

            //     cache.writeQuery<graph.PlaceListsResult>({
            //         query: graph.PLACE_LISTS,
            //         data: nextData,
            //         variables: {
            //             first: 100,
            //         },
            //     });
            // },
        });
    };

    return [mutate, result] as [typeof mutate, typeof result];
}