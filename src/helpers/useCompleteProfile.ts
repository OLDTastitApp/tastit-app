// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'


type MutateArgs = graph.CompleteProfileArgs['input']

export default () => {

    const [updateProfile, result] = useMutation<
        graph.CompleteProfileResult,
        graph.CompleteProfileArgs
    >(graph.COMPLETE_PROFILE);

    const mutate = async (args: MutateArgs) => {
        return await updateProfile({
            variables: {
                input: args,
            },
        });
    };

    return [mutate, result] as [typeof mutate, typeof result];
}