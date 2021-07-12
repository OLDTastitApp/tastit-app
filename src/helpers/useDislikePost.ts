// Apollo
import { useMutation } from '@apollo/client'
import * as graph from '@graphql/graph'


type MutateArgs = graph.DislikePostArgs['input']

export default () => {

    const [dislikePost, result] = useMutation<
        graph.DislikePostResult,
        graph.DislikePostArgs
    >(graph.DISLIKE_POST);

    const mutate = async (args: MutateArgs) => {

        const { postId } = args;

        return await dislikePost({
            variables: {
                input: {
                    postId,
                },
            },
        });
    };

    return [mutate, result] as [typeof mutate, typeof result];
}