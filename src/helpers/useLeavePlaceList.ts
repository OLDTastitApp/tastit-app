// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'


type MutateArgs = graph.LeavePlaceListArgs['input']

export default () => {

    const [leavePlaceList, result] = useMutation<
        graph.LeavePlaceListResult,
        graph.LeavePlaceListArgs
    >(graph.LEAVE_PLACE_LIST);

    const mutate = async (args: MutateArgs) => {

        const { id } = args;

        const result = await leavePlaceList({
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