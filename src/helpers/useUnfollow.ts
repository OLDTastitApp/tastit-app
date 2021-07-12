// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'


type MutateArgs = graph.UnfollowArgs['input']

export default () => {

    const [unfollow, result] = useMutation<
        graph.UnfollowResult,
        graph.UnfollowArgs
    >(graph.UNFOLLOW);

    const mutate = async (args: MutateArgs) => {

        const { userId } = args;

        return await unfollow({
            variables: {
                input: {
                    userId,
                },
            },
        });
    };

    return [mutate, result] as [typeof mutate, typeof result];
}