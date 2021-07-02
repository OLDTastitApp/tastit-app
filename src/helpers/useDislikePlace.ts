// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'


type MutateArgs = graph.DislikePlaceArgs['input']

export default () => {

    const [dislikePlaceList, result] = useMutation<
        graph.DislikePlaceResult,
        graph.DislikePlaceArgs
    >(graph.DISLIKE_PLACE);

    const mutate = async (args: MutateArgs) => {

        const { placeId } = args;

        return await dislikePlaceList({
            variables: {
                input: {
                    placeId,
                },
            },
        });
    };

    return [mutate, result] as [typeof mutate, typeof result];
}