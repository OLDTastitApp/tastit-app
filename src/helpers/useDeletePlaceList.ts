// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'


type MutateArgs = graph.DeletePlaceListArgs['input']

export default () => {

    const [deletePlaceList, result] = useMutation<
        graph.DeletePlaceListResult,
        graph.DeletePlaceListArgs
    >(graph.DELETE_PLACE_LIST);

    const mutate = async (args: MutateArgs) => {

        const { id } = args;

        const result = await deletePlaceList({
            refetchQueries: [
                'PlaceLists',
            ],
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