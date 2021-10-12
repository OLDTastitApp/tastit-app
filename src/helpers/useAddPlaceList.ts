// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'


type MutateArgs = graph.AddPlaceListArgs['input']

export default () => {

    const [addPlaceList, result] = useMutation<
        graph.AddPlaceListResult,
        graph.AddPlaceListArgs
    >(graph.ADD_PLACE_LIST);

    const mutate = async (args: MutateArgs) => {

        const { code } = args;

        const result = await addPlaceList({
            // refetchQueries: [
            //     'PlaceLists',
            // ],
            variables: {
                input: {
                    code,
                },
            },
        });

        return result;
    };

    return [mutate, result] as [typeof mutate, typeof result];
}