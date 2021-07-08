// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'

// Utils
import update from 'immutability-helper'


type MutateArgs = graph.CreatePostArgs['input']

export default () => {

    const [createPost, result] = useMutation<
        graph.CreatePostResult,
        graph.CreatePostArgs
    >(graph.CREATE_POST);

    const mutate = async (args: MutateArgs) => {

        const { userIds, placeId, content, picture } = args;

        const result = await createPost({
            variables: {
                input: {
                    userIds,
                    placeId,
                    content,
                    picture,
                },
            },
            update: (cache, { data }) => {

                const { post } = data.createPost;

                // const previousData = cache.readQuery<
                //     graph.PlaceListsResult,
                //     graph.PlaceListsArgs
                // >({
                //     query: graph.PLACE_LISTS,
                //     variables: {
                //         first: 100,
                //     },
                // });

                // const cursor = JSON.stringify({
                //     createdAt: placeList.createdAt,
                // });

                // const edge = {
                //     __typename: 'PlaceListEdge',
                //     node: placeList,
                //     author: true,
                //     cursor,
                // };

                // const nextData = update(previousData, {
                //     placeLists: {
                //         pageInfo: {
                //             startCursor: {
                //                 $set: cursor,
                //             },
                //         },
                //         edges: {
                //             $splice: [[0, 0, edge]],
                //         },
                //     },
                // });

                // cache.writeQuery<graph.PlaceListsResult>({
                //     query: graph.PLACE_LISTS,
                //     data: nextData,
                //     variables: {
                //         first: 100,
                //     },
                // });
            },
        });
    };

    return [mutate, result] as [typeof mutate, typeof result];
}