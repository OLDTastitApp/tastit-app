// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'


type MutateArgs = graph.LikePlaceArgs['input']

export default () => {

    const [likePlaceList, result] = useMutation<
        graph.LikePlaceResult,
        graph.LikePlaceArgs
    >(graph.LIKE_PLACE);

    const mutate = async (args: MutateArgs) => {

        const { placeId } = args;

        return await likePlaceList({
            variables: {
                input: {
                    placeId,
                },
            },
        });
    };

    return [mutate, result] as [typeof mutate, typeof result];
}