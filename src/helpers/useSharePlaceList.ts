// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'


type MutateArgs = graph.SharePlaceListArgs['input']

export default () => {

    const [sharePlaceList, result] = useMutation<
        graph.SharePlaceListResult,
        graph.SharePlaceListArgs
    >(graph.SHARE_PLACE_LIST);

    const mutate = async (args: MutateArgs) => {

        const { id } = args;

        const result = await sharePlaceList({
            variables: {
                input: {
                    id,
                },
            },
        });

        return result;
    };

    return [mutate, result] as [typeof mutate, typeof result];
}