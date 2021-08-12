// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'


type MutateArgs = graph.UpdateProfileArgs['input']

export default () => {

    const [updateProfile, result] = useMutation<
        graph.UpdateProfileResult,
        graph.UpdateProfileArgs
    >(graph.UPDATE_PROFILE);

    const mutate = async (args: MutateArgs) => {
        return await updateProfile({
            variables: {
                input: args,
            },
        });
    };

    return [mutate, result] as [typeof mutate, typeof result];
}