// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'


type MutateArgs = graph.FollowArgs['input']

export default () => {

    const [follow, result] = useMutation<
        graph.FollowResult,
        graph.FollowArgs
    >(graph.FOLLOW);

    const mutate = async (args: MutateArgs) => {

        const { userId } = args;

        return await follow({
            variables: {
                input: {
                    userId,
                },
            },
        });
    };

    return [mutate, result] as [typeof mutate, typeof result];
}